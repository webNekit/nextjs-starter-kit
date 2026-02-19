"use client";

import { UpdateUserInput, updateUserSchema } from "@/entities/users/users.schema";
import { User } from "@/entities/users/users.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useUpdateUserForm(user: User) {
    return useForm<UpdateUserInput>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            password: "",
            // file: undefined (файл нельзя предзаполнить)
        },
    });
}