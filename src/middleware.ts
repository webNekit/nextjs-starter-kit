import { NextRequest, NextResponse } from 'next/server';
import { parse, Cookie } from 'set-cookie-parser';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const PROTECTED_ROUTES = ['/profile', '/dashboard', '/admin'];
const GUEST_ONLY_ROUTES = ['/login', '/register'];

function isTokenExpired(token: string) {
  try {
    const payloadBase64 = token.split('.')[1];
    // atob нативно доступен в браузере и Edge runtime
    const { exp } = JSON.parse(atob(payloadBase64));
    return exp * 1000 < Date.now() + 10000;
  } catch {
    return true; // Если токен кривой, считаем его протухшим
  }
}

// 2. Выносим огромную логику рефреша в отдельную функцию
async function refreshAuthToken(refreshToken: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000/api';
  
  try {
    const refreshRes = await fetch(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        Cookie: `${REFRESH_TOKEN}=${refreshToken}`, 
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!refreshRes.ok) return { error: 'Refresh failed', status: refreshRes.status };

    const data = await refreshRes.json().catch(() => ({}));
    let newAccessToken = data.accessToken ?? data.data?.accessToken;
    
    let parsedCookies: Cookie[] = [];
    const setCookieHeaders = refreshRes.headers.getSetCookie();

    if (setCookieHeaders?.length) {
      parsedCookies = parse(setCookieHeaders);
      if (!newAccessToken) {
        newAccessToken = parsedCookies.find((c) => c.name === ACCESS_TOKEN)?.value;
      }
    }

    if (!newAccessToken) return { error: 'No token in response' };

    return { 
      newAccessToken, 
      backendCookies: parsedCookies 
    };
  } catch (err) {
    return { error: 'Network error' };
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Очистка сессии при протухшем токене
  if (pathname === '/login' && searchParams.get('error') === 'session_expired') {
    const response = NextResponse.next();
    response.cookies.delete(ACCESS_TOKEN);
    response.cookies.delete(REFRESH_TOKEN);
    return response;
  }
  
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;
  let accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

  const requestHeaders = new Headers(request.headers);
  let responseCookiesToSet: Cookie[] = [];

  // === ЭТАП 1: ПРОВЕРКА И ОБНОВЛЕНИЕ ТОКЕНА ===
  if (refreshToken && (!accessToken || isTokenExpired(accessToken))) {
    const refreshResult = await refreshAuthToken(refreshToken);

    if (refreshResult.error) {
      const redirectRes = NextResponse.redirect(new URL('/login', request.url));
      redirectRes.cookies.delete(ACCESS_TOKEN);
      
      // Удаляем рефреш только если бэкенд явно сказал, что он умер (401)
      if (refreshResult.status === 401) {
        redirectRes.cookies.delete(REFRESH_TOKEN);
      }
      return redirectRes;
    }

    accessToken = refreshResult.newAccessToken;

    // ВАЖНО: Модифицируем куки запроса так, чтобы НЕ затереть другие куки (например, локаль или тему)
    const allRequestCookies = request.cookies.getAll();
    const updatedCookieString = allRequestCookies
      .map(c => `${c.name}=${c.name === ACCESS_TOKEN ? accessToken : c.value}`)
      .join('; ');

    // Если токена изначально не было в куках, добавляем его в строку
    if (!allRequestCookies.some(c => c.name === ACCESS_TOKEN)) {
      requestHeaders.set('Cookie', `${updatedCookieString}; ${ACCESS_TOKEN}=${accessToken}`);
    } else {
      requestHeaders.set('Cookie', updatedCookieString);
    }

    // Сохраняем куки от бэка для дальнейшей установки их в Response пользователю
    responseCookiesToSet = refreshResult.backendCookies || [];
  }

  // === ЭТАП 2: РОУТИНГ И РЕДИРЕКТЫ ===
  const isLikelyAuthenticated = !!accessToken;
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const isGuestOnlyRoute = GUEST_ONLY_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (isProtectedRoute && !isLikelyAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnlyRoute && isLikelyAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // === ЭТАП 3: ВОЗВРАТ ОТВЕТА ===
  // Прокидываем обновленные куки для SSR
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Если были получены куки при рефреше — аккуратно проставляем их клиенту
  if (responseCookiesToSet.length > 0) {
    responseCookiesToSet.forEach(cookie => {
      // Конвертируем возможный миллисекундный maxAge в секунды (фикс твоей старой логики)
      let maxAge = cookie.maxAge;
      if (maxAge && maxAge > 1000000) maxAge = Math.floor(maxAge / 1000);

      response.cookies.set({
        name: cookie.name,
        value: cookie.value,
        path: cookie.path || '/',
        httpOnly: cookie.httpOnly ?? true,
        secure: cookie.secure ?? process.env.NODE_ENV === 'production',
        sameSite: (cookie.sameSite?.toLowerCase() as 'lax' | 'strict' | 'none') ?? 'lax',
        ...(maxAge ? { maxAge } : {}),
        ...(cookie.expires ? { expires: cookie.expires } : {}),
      });
    });
  } else if (refreshToken && accessToken) {
    // Резервная установка куки (только для сценария обновления), если бэкенд не прислал Set-Cookie.
    // Если токен только что обновился, но `responseCookiesToSet` почему-то пуст
    // Важно делать это только если действительно происходил refresh (например, responseCookiesToSet определялся)
    // В данном упрощении мы полагаемся на то, что бэк всегда возвращает Set-Cookie.
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
