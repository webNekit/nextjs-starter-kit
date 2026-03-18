import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractValidationErrors(errors?: any) {
  if (!errors) return [];

  return Object.values(errors)
    .flatMap((field: any) => field?._errors ?? []);
}
