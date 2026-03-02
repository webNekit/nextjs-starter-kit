import { httpServer } from "@/shared/api/http-server";
import { BackendResponse } from "@/shared/auth/types";
import { API_ROUTES } from "@/shared/routes/api-routes";
import type { LoginInput } from './auth.schema';

export const authService = {
    register(formData: FormData) {
        return httpServer({
            method: "POST",
            body: formData,
            endpoint: API_ROUTES.AUTH.REGISTER,
            processSetCookie: true,
        });
    },

    login(data: LoginInput) {
        return httpServer({
            method: "POST",
            body: data,
            endpoint: API_ROUTES.AUTH.LOGIN,
            processSetCookie: true,
        });
    },

    logout() {
        return httpServer({
            method: "POST",
            endpoint: API_ROUTES.AUTH.LOGOUT,
            processSetCookie: true,
        });
    },
    async refresh() {
        const response = await httpServer<BackendResponse<{ accessToken: string }>>({
            method: "POST",
            endpoint: API_ROUTES.AUTH.REFRESH,
            processSetCookie: true,
        });
        return response.data; 
    }
};
