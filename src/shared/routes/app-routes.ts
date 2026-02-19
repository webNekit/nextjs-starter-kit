export const APP_ROUTES = {
    root: (path: string = '') => path,
    HOME: () => APP_ROUTES.root('/'),
    PROFILE: () => APP_ROUTES.root('/profile'),
    AUTH: {
        LOGIN: () => APP_ROUTES.root('/login'),
        REGISTER: () => APP_ROUTES.root('/register'),
    },
    ADMIN: {
        HOME: () => APP_ROUTES.root('/dashboard'),
        PROJECT: () => APP_ROUTES.root('/dashboard/project'),
        USER: {
            INDEX: () => APP_ROUTES.root('/dashboard/users'),
            CREATE: () => APP_ROUTES.root('/dashboard/users/create'),
            UPDATE: (id: string) => APP_ROUTES.root('/dashboard/users/edit/' + id),
        },
    },
} as const;