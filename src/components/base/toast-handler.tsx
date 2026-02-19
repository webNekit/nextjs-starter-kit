"use client";

import { useEffect } from "react";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

import { toastParamsParsers } from "@/shared/lib/toast-params";
import { cn } from "@/shared/lib/utils";

export function ToastHandler() {
  const [{ status, message }, setParams] = useQueryStates(toastParamsParsers, {
    shallow: true,
  });

  useEffect(() => {
    if (!status) return;

    const description = message ? decodeURIComponent(message) : undefined;
    const isSuccess = status === "success";

    toast.custom(
      (id) => (
        <div
          onClick={() => toast.dismiss(id)}
          className={cn(
            "glass-panel p-4 rounded-xl flex items-start gap-4 shadow-2xl w-[340px] relative overflow-hidden group",
            "hover:-translate-y-0.5",
            isSuccess
              ? "border-emerald-500/40"
              : "border-red-500/40"
          )}
        >
          <div className="mt-0.5">
            {isSuccess ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-400" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              {isSuccess ? "Успешно" : "Ошибка"}
            </p>
            <p className="mt-0.5 text-xs text-zinc-300/80">
              {description ||
                (isSuccess
                  ? "Операция выполнена успешно"
                  : "Ошибка выполнения операции")}
            </p>
          </div>

          <button
            type="button"
            className="mt-0.5 text-zinc-500 hover:text-zinc-300"
            onClick={(event) => {
              event.stopPropagation();
              toast.dismiss(id);
            }}
            aria-label="Закрыть уведомление"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ),
      {
        duration: 4000,
      }
    );

    setParams({ status: null, message: null });
  }, [status, message, setParams]);

  return null;
}