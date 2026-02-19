import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { parse } from 'set-cookie-parser';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const PROTECTED_ROUTES = ['/profile', '/dashboard', '/admin'];
const GUEST_ONLY_ROUTES = ['/login', '/register'];

// Проверка: истек ли токен
function isTokenExpired(token: string) {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    // Считаем истекшим, если осталось меньше 10 секунд
    return exp * 1000 < Date.now() + 10000;
  } catch {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Получаем токены
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  let accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  let response = NextResponse.next();

  if (refreshToken && (!accessToken || isTokenExpired(accessToken))) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api';
      
      const refreshRes = await fetch(`${apiUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          Cookie: `${REFRESH_TOKEN}=${refreshToken}`, 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Важно для передачи кук
      });

      const setCookieHeaders = refreshRes.headers.getSetCookie();

      if (refreshRes.ok) {
        const data = await refreshRes.json().catch(() => ({}));
        // Backend может возвращать { accessToken } или { data: { accessToken } } (BackendResponse)
        const newAccessTokenFromBody = data.accessToken ?? data.data?.accessToken;
        // Если в теле нет токена — берём из Set-Cookie (там точно есть при 200)
        let newAccessToken = newAccessTokenFromBody;
        if (!newAccessToken && setCookieHeaders?.length) {
          const parsed = parse(setCookieHeaders);
          const accessCookie = parsed.find((c) => c.name === ACCESS_TOKEN);
          if (accessCookie) newAccessToken = accessCookie.value;
        }

        if (newAccessToken) {
          accessToken = newAccessToken;

          // Создаем новый response с обновленными заголовками запроса
          const requestHeaders = new Headers(request.headers);
          requestHeaders.set('Cookie', `${ACCESS_TOKEN}=${newAccessToken}; ${REFRESH_TOKEN}=${refreshToken}`);
          
          response = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });

          // Устанавливаем куки через response.cookies.set() (правильный способ в Next.js middleware)
          if (setCookieHeaders && setCookieHeaders.length > 0) {
            const parsedCookies = parse(setCookieHeaders);
            
            parsedCookies.forEach((cookie) => {
              // ВАЖНО: Не устанавливаем domain из Set-Cookie заголовков backend,
              // так как они могут быть для домена backend, а нам нужны куки для текущего домена (Next.js)
              // Если domain не указан, куки будут установлены для текущего домена автоматически
              
              // Конвертируем maxAge из миллисекунд в секунды (если нужно)
              // set-cookie-parser возвращает maxAge в секундах, но проверяем на всякий случай
              let maxAge = cookie.maxAge;
              if (maxAge && maxAge > 1000000) {
                // Если maxAge очень большой (вероятно в миллисекундах), конвертируем в секунды
                maxAge = Math.floor(maxAge / 1000);
              }
              
              const cookieOptions: {
                name: string;
                value: string;
                path: string;
                httpOnly: boolean;
                secure: boolean;
                sameSite: 'lax' | 'strict' | 'none';
                expires?: Date;
                maxAge?: number;
              } = {
                name: cookie.name,
                value: cookie.value,
                path: cookie.path ?? '/',
                httpOnly: cookie.httpOnly ?? true,
                secure: cookie.secure ?? false,
                sameSite: (cookie.sameSite as 'lax' | 'strict' | 'none' | undefined) ?? 'lax',
              };
              
              // Добавляем expires или maxAge (Next.js использует expires если указано)
              if (cookie.expires) {
                cookieOptions.expires = cookie.expires;
              } else if (maxAge) {
                cookieOptions.maxAge = maxAge;
              }
              
              response.cookies.set(cookieOptions);
            });
          } else {
            // Если backend не вернул Set-Cookie заголовки, устанавливаем куки вручную
            response.cookies.set({
              name: ACCESS_TOKEN,
              value: newAccessToken,
              path: '/',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 15 * 60, // 15 минут в секундах
            });
          }
        } else {
          // Нет токена ни в теле, ни в Set-Cookie — редкий случай при 200
          response = NextResponse.redirect(new URL('/login', request.url));
          response.cookies.delete(ACCESS_TOKEN);
          return response;
        }
      } else {
        // Если refresh token невалидный (401), удаляем оба токена
        if (refreshRes.status === 401) {
          response = NextResponse.redirect(new URL('/login', request.url));
          response.cookies.delete(ACCESS_TOKEN);
          response.cookies.delete(REFRESH_TOKEN);
          return response;
        }
        
        // Для других ошибок удаляем только access token, refresh может быть валидным
        response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete(ACCESS_TOKEN);
        return response;
      }
    } catch {
      // При ошибке сети/таймауте не удаляем refresh token, он может быть валидным
      response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete(ACCESS_TOKEN);
      return response;
    }
  }

  const isLikelyAuthenticated = !!accessToken;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !isLikelyAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isGuestOnlyRoute = GUEST_ONLY_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isGuestOnlyRoute && isLikelyAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};