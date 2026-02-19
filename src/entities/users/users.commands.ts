import { usersService } from "./users.service";
import type { CreateUserInput, UpdateUserInput } from "./users.schema";

export type UserCommandResult =
  | { success: true }
  | { success: false; error: string };

export async function createUserCommand(
  data: CreateUserInput
): Promise<UserCommandResult> {
  const payload = new FormData();
  payload.append("email", data.email);
  payload.append("fullName", data.fullName);
  payload.append("password", data.password);
  payload.append("role", data.role);

  if (data.file && data.file instanceof File && data.file.size > 0) {
    payload.append("file", data.file);
  }

  try {
    await usersService.create(payload);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Не удалось создать нового пользователя";
    return { success: false, error: message };
  }
}

export async function updateUserCommand(
  id: string,
  data: UpdateUserInput
): Promise<UserCommandResult> {
  const payload = new FormData();
  payload.append("role", data.role);
  payload.append("email", data.email);
  payload.append("fullName", data.fullName);

  if (data.password) {
    payload.append("password", data.password);
  }

  if (data.file) {
    payload.append("file", data.file);
  }

  try {
    await usersService.update(id, payload);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Не удалось редактировать данные пользователя";
    return { success: false, error: message };
  }
}

export async function deleteUserCommand(id: string): Promise<UserCommandResult> {
  try {
    await usersService.delete(id);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Не удалось удалить пользователя";
    return { success: false, error: message };
  }
}

