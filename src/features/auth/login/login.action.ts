"use server";

import { loginSchema } from "@/entities/auth/auth.schema";
import { loginCommand } from "@/entities/auth/auth.commands";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import { redirect } from "next/navigation";

export type LoginState = {
  error?: string;
  success?: boolean;
};

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parse = loginSchema.safeParse(formData);

  if (!parse.success) {
      const allErrors = parse.error.issues.map((issue) => issue.message);
      return { errors: allErrors };
  }

  const result = await loginCommand(parse.data);

  if (!result.success) {
      return { error: result.error };
  }
  redirect(APP_ROUTES.PROFILE());
}