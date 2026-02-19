import { AppRole } from "@/shared/auth/types";

export interface AuthUser {
    id: string;
    email: string;
    fullName: string;
    role: AppRole;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface TokenPair {
    accessString: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: AuthResponse;
    tokens: TokenPair;
}