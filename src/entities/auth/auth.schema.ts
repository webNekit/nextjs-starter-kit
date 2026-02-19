import { z } from 'zod';
import { zfd } from 'zod-form-data';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const registerSchema = zfd.formData({
    email: zfd.text(z.string().email("Введите корректный email")),
    fullName: zfd.text(z.string().min(2, "Имя должно быть не короче 2 символов")),
    password: zfd.text(z.string().min(6, "Пароль минимум 6 символов")),
    
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

export const loginSchema = zfd.formData({
    email: zfd.text(z.string("Заполните поле email").email("Введите корректный email")),
    password: zfd.text(z.string("Заполните поле пароль").min(6, "Длина пароля должна быть не менее 6 символов")),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;