import { cookies } from "next/headers";

export const COOKIE_NAMES = {
    ACCESS: 'access_token',
    REFRESH: 'refresh_token',
} as const;

export async function getAccessToken() {
    return (await cookies()).get(COOKIE_NAMES.ACCESS)?.value;
}

export async function getRefreshToken() {
    return (await cookies()).get(COOKIE_NAMES.REFRESH)?.value;
}

export async function hasAuthCookies() {
    return (await cookies()).has(COOKIE_NAMES.REFRESH);
}