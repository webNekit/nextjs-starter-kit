import { cookies } from "next/headers";
import { env } from "@/shared/config/env";
import { parse } from "set-cookie-parser";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
    method: HttpMethod;
    endpoint: string;
    body?: any;
    headers?: Record<string, string>;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
}

export async function httpServer<T>({
    method,
    endpoint,
    body,
    headers = {},
    cache = "no-store",
    next,
}: RequestOptions): Promise<T> {
    const cookieStore = await cookies();
    const isFormData = body instanceof FormData;

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method,
        headers: {
            Accept: "application/json",
            Cookie: cookieStore.toString(),
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...headers,
        },
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        cache,
        next,
    });
    
    // Парсим заголовки Set-Cookie от NestJS
    const setCookieHeader = response.headers.getSetCookie();

    if (setCookieHeader && setCookieHeader.length > 0) {
        const parsedCookies = parse(setCookieHeader);

        parsedCookies.forEach((cookie) => {
            const domain = cookie.domain === 'localhost' ? undefined : cookie.domain;

            try {
                cookieStore.set({
                    name: cookie.name,
                    value: cookie.value,
                    domain: domain, 
                    path: cookie.path ?? "/",
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    expires: cookie.expires,
                    maxAge: cookie.maxAge,
                    sameSite: cookie.sameSite as "lax" | "strict" | "none" | undefined,
                });
            } catch (error) {}
        });
    }

    if (!response.ok) {
        const errorJson = await response.json().catch(() => null);
        const message = errorJson?.message 
            ? errorJson.message 
            : `API Error: ${response.status} ${response.statusText}`;
            
        throw new Error(message);
    }

    // Обработка 204 No Content (пустой ответ)
    if (response.status === 204) {
        return {} as T;
    }

    return response.json() as Promise<T>;
}