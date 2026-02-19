export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
};

export enum SortOrder {
    ASC = "asc",
    DESC = "desc",
};

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
};

export interface UserListResponse {
    data: User[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

export interface UserQueryParams {
    page?: number;
    limit?: number;
    role?: UserRole;
    sort?: SortOrder;
};