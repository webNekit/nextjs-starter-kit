"use client";

import { LoginInput, loginSchema } from "@/entities/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useLoginForm() {
    return useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: { "email": "", "password": "" },
    });
}