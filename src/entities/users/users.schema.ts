import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { SortOrder, UserRole } from './users.type';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createUserSchema = zfd.formData({
    email: zfd.text(z.string("Укажите email").email("Некорректный email")),
    fullName: zfd.text(z.string("Укажите имя пользователя").min(2, "Минимум 2 символа")),
    password: zfd.text(z.string("Придумайте пароль").min(6, "Минимум 6 символов")),
    role: zfd.text(z.nativeEnum(UserRole).optional().default(UserRole.USER)),
    file: z.preprocess(
        (val) => {
            if (val instanceof File && val.size === 0) return undefined;
            if (!val || val === "") return undefined;
            return val;
        },
        z.instanceof(File)
            .optional()
            .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Размер файла до 5MB")
            .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Только изображения")
    ),
});

export const updateUserSchema = zfd.formData({
    email: zfd.text(z.string().min(1, "Email обязателен").email("Некорректный email")),
    fullName: zfd.text(z.string().min(2, "Имя обязательно")),
    role: zfd.text(z.nativeEnum(UserRole)),
    password: zfd.text(z.string().min(6).optional()),
    file: z.preprocess(
        (val) => {
            if (val instanceof File && val.size === 0) return undefined;
            if (!val) return undefined;
            return val;
        },
        z.instanceof(File)
            .optional()
            .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Размер файла до 5MB")
            .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Только изображения")
    ),
});

export const usersSearchParams = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    role: z.nativeEnum(UserRole).optional(),
    sort: z.nativeEnum(SortOrder).default(SortOrder.DESC),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
