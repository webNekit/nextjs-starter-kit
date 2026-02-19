export enum AppRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface JwtPayload {
    sub: string;
    email: string;
    role: AppRole;
    exp: number;
    iat: number;
}

export interface BackendResponse<T> {
    success: boolean;
    data: T;
    timestamp: string;
}