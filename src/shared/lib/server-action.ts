import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type ToastStatus = "success" | "error";

export function redirectWithToast(path: string, status: ToastStatus, message: string): never {
  const encoded = encodeURIComponent(message);
  redirect(`${path}?status=${status}&message=${encoded}`);
}

export function revalidateAndRedirectWithToast(path: string, status: ToastStatus, message: string): never {
  revalidatePath(path);
  redirectWithToast(path, status, message);
}

