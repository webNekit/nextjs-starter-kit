"use client";

import { cn } from "@/shared/lib/utils";
import { useBackendStatus } from "../hooks/use-backend-status";

export function BackendStatus() {
    const { isOk, isError, isLoading } = useBackendStatus();

    let statusText = "Connecting...";
    let dotColor = "bg-yellow-500 animate-pulse";
    let textColor = "text-yellow-400";

    if (!isLoading) {
        if (isOk) {
            statusText = "Ok";
            dotColor = "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"; // Добавил свечение для красоты
            textColor = "text-emerald-400";
        } else if (isError) {
            statusText = "Failed";
            dotColor = "bg-red-500";
            textColor = "text-red-400";
        }
    }

    return (
        <div className="px-4 h-18 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
            <span className="text-sm font-medium text-muted-foreground tracking-tight">
                Подключение к API
            </span>
            
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                <div className={cn("w-2 h-2 rounded-full transition-all duration-500", dotColor)} />
                <span className={cn("text-xs font-semibold tracking-wide transition-colors duration-300", textColor)}>
                    {statusText}
                </span>
            </div>
        </div>
    );
}