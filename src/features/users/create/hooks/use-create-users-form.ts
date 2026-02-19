"use client";

import { CreateUserInput, createUserSchema } from "@/entities/users/users.schema";
import { UserRole } from "@/entities/users/users.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useCreateUsersForm() {
    return useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            "email": "",
            "password": "",
            "fullName": "",
            "role": UserRole.USER,
        },
    });
} 