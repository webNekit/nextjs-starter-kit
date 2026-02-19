import { authService } from "./auth.service";
import type { LoginInput, RegisterInput } from "./auth.schema";

export type AuthCommandResult = 
  | { success: true } 
  | { success: false; error: string };

export async function loginCommand(data: LoginInput): Promise<AuthCommandResult> {
  try {
    // login принимает JSON, поэтому передаем data напрямую
    await authService.login(data);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Ошибка входа";
    return { success: false, error: message };
  }
}

export async function registerCommand(data: RegisterInput): Promise<AuthCommandResult> {
  const payload = new FormData();
  
  payload.append("email", data.email);
  payload.append("fullName", data.fullName);
  payload.append("password", data.password);
  
  if (data.file && data.file instanceof File && data.file.size > 0) {
      payload.append("file", data.file);
  }

  try {
    await authService.register(payload);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Ошибка регистрации";
    return { success: false, error: message };
  }
}

export async function logoutCommand(): Promise<AuthCommandResult> {
    try {
        await authService.logout();
        return { success: true };
    } catch (error: unknown) {
        console.warn("Logout warning:", error);
        return { success: true }; 
    }
}