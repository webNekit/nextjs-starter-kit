import { httpServer } from '@/shared/api/http-server';
import { User, UserListResponse, UserQueryParams, UserRole } from './users.type';
import { API_ROUTES } from '@/shared/routes/api-routes';
import { CreateUserInput } from './users.schema';
import { toFormData } from '@/shared/lib/form-data';

export const usersService = {
    getMe() {
        return httpServer<User>({
            method: "GET",
            cache: "no-store",
            endpoint: API_ROUTES.USERS.ME,
        });
    },

    async getStats() {
        const [ total, admins, users ] = await Promise.all([
            this.getAll({ limit: 1 }),
            this.getAll({ limit: 1, role: UserRole.ADMIN }),
            this.getAll({ limit: 1, role: UserRole.USER }),
        ]);

        return {
            total: total.meta,
            admins: admins.meta,
            users: users.meta,
        };
    },

    async getAll(params: UserQueryParams) {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.set("page", String(params.page));
        if (params.limit) searchParams.set("limit", String(params.limit));
        if (params.role) searchParams.set("role", params.role);
        if (params.sort) searchParams.set("sort", params.sort);

        const response = await httpServer<UserListResponse>({
            method: "GET",
            cache: "no-store",
            endpoint: `${API_ROUTES.USERS.INDEX}?${searchParams.toString()}`,
        });

        return response.data;
    },

    getById(id: string) {
        return httpServer<User>({
            method: "GET",
            endpoint: API_ROUTES.USERS.SHOW(id),
        });
    },

    create(data: CreateUserInput) {
        return httpServer<User>({
            method: "POST",
            body: toFormData(data),
            endpoint: API_ROUTES.USERS.CREATE(),
        });
    },

    update(id: string, formData: FormData) {
        return httpServer<User>({
            method: "PATCH",
            body: formData,
            endpoint: API_ROUTES.USERS.UPDATE(id),
        });
    },

    delete(id: string) {
        return httpServer<void>({
            method: "DELETE",
            endpoint: API_ROUTES.USERS.DELETE(id),
        });
    },
};
