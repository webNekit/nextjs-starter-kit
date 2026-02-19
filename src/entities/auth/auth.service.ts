import { httpServer } from "@/shared/api/http-server";
import { BackendResponse } from "@/shared/auth/types";
import { API_ROUTES } from "@/shared/routes/api-routes";

export const authService = {
    register(formData: FormData) {
        return httpServer({
            method: "POST",
            body: formData,
            endpoint: API_ROUTES.AUTH.REGISTER,
        });
    },

    login(formData: FormData) {
        return httpServer({
            method: "POST",
            body: formData,
            endpoint: API_ROUTES.AUTH.LOGIN,
        });
    },

    logout() {
        return httpServer({
            method: "POST",
            endpoint: API_ROUTES.AUTH.LOGOUT,
        });
    },
    async refresh() {
        const response = await httpServer<BackendResponse<{ accessToken: string }>>({
            method: "POST",
            endpoint: API_ROUTES.AUTH.REFRESH,
        });
        return response.data; 
    }
};