import { redirect } from "next/navigation";
import { getUserSession } from "./session";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import { AppRole } from "./types";

function handleAuthError() {
    redirect("/api/auth/session-expired");
}

export async function requireAuth() {
    const user = await getUserSession();
    if (!user) handleAuthError();
    return user;
}

export async function requireAdmin() {
    const user = await requireAuth();
    if (user.role !== AppRole.ADMIN) redirect(APP_ROUTES.ADMIN.HOME());
    return user;
}

export async function requireGuest() {
    const user = await getUserSession();
    if (user) redirect(APP_ROUTES.PROFILE());
}

export async function requireUser() {
    const user = await getUserSession();
    if (!user) handleAuthError();
    if (user.role !== AppRole.USER) redirect(APP_ROUTES.HOME());
    return user;
}