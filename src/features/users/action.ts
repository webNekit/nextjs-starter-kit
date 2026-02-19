"use server";

import {
  createUserSchema,
  updateUserSchema,
} from "@/entities/users/users.schema";
import {
  createUserCommand,
  updateUserCommand,
  deleteUserCommand,
} from "@/entities/users/users.commands";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import { revalidateAndRedirectWithToast, redirectWithToast } from "@/shared/lib/server-action";

export type FormState = {
  errors?: string[] | string;
  success?: boolean;
};

export async function createUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parse = createUserSchema.safeParse(formData);

  if (!parse.success) {
    const allErrors = parse.error.issues.map((issue) => issue.message);
    return { errors: allErrors };
  }

  const result = await createUserCommand(parse.data);

  if (!result.success) {
    redirectWithToast(APP_ROUTES.ADMIN.USER.INDEX(), "error", result.error || "Не удалось создать нового пользователя");
  }

  revalidateAndRedirectWithToast(
    APP_ROUTES.ADMIN.USER.INDEX(),
    "success",
    "Новый пользователь создан"
  );
}

export async function updateUserAction(
  id: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parse = updateUserSchema.safeParse(formData);

  if (!parse.success) {
    const allErrors = parse.error.issues.map((issue) => issue.message);
    return { errors: allErrors };
  }

  const result = await updateUserCommand(id, parse.data);

  if (!result.success) {
    redirectWithToast(
      APP_ROUTES.ADMIN.USER.INDEX(),
      "error",
      result.error || "Не удалось редактировать данные пользователя"
    );
  }

  revalidateAndRedirectWithToast(
    APP_ROUTES.ADMIN.USER.INDEX(),
    "success",
    "Данные пользователя обновлены"
  );
}

export async function deleteUserAction(id: string) {
  const result = await deleteUserCommand(id);

  if (!result.success) {
    redirectWithToast(
      APP_ROUTES.ADMIN.USER.INDEX(),
      "error",
      result.error || "Не удалось удалить пользователя"
    );
  }

  revalidateAndRedirectWithToast(
    APP_ROUTES.ADMIN.USER.INDEX(),
    "success",
    "Пользователь успешно удален"
  );
}