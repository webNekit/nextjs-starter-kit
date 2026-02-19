import { jwtDecode } from 'jwt-decode';
import { getAccessToken, getRefreshToken } from "./cookies";
import { JwtPayload } from './types';
import { authService } from '@/entities/auth/auth.service';
import { cache } from 'react';

function isTokenExpired(token: string): boolean {
    try {
        const payload = jwtDecode<JwtPayload>(token);
        return payload.exp * 1000 < Date.now(); 
    } catch {
        return true;
    }
}
export const getUserSession = cache(async () => {
    let accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (!accessToken && !refreshToken) return null;

    if (accessToken && !isTokenExpired(accessToken)) {
        const payload = jwtDecode<JwtPayload>(accessToken);
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
            sessionStart: (payload.iat || 0) * 1000,
        };
    }

    if (refreshToken && (!accessToken || isTokenExpired(accessToken))) {
        try {
            console.log("Refreshing token...");
            const res = await authService.refresh();
            const newAccessToken = res?.accessToken; 

            if (newAccessToken) {
                const payload = jwtDecode<JwtPayload>(newAccessToken);
                return {
                    userId: payload.sub,
                    email: payload.email,
                    role: payload.role,
                    sessionStart: (payload.iat || 0) * 1000, 
                };
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            return null;
        }
    }

    return null;
});