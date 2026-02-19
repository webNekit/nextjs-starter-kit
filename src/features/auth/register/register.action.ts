"use server";

import { registerSchema } from "@/entities/auth/auth.schema";
import { registerCommand } from "@/entities/auth/auth.commands";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import { redirect } from "next/navigation";

export type RegisterState = {
    errors?: string[] | string;
    success?: boolean;
};

export async function registerAction(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const parse = registerSchema.safeParse(formData);

  if (!parse.success) {
      const allErrors = parse.error.issues.map(issue => issue.message);
      return { errors: allErrors };
  }

  const result = await registerCommand(parse.data);

  if (!result.success) {
      return { errors: result.error };
  }
  redirect(APP_ROUTES.PROFILE());
}