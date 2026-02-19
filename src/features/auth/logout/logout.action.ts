"use server";

import { logoutCommand } from "@/entities/auth/auth.commands";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import { redirect } from "next/navigation";

export async function logoutAction() {
    await logoutCommand();
    redirect(APP_ROUTES.HOME());
}