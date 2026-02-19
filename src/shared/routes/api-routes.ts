export const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        REFRESH: "/auth/refresh",
    },
    USERS: {
        ME: "/users/me",
        INDEX: "/users",
        CREATE: () => "/users",
        SHOW: (id: string) => `/users/${id}`,
        UPDATE: (id: string) => `/users/${id}`,
        DELETE: (id: string) => `/users/${id}`,
    },
} as const;
