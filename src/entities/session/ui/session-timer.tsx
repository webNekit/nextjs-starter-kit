"use client";

import { Clock } from "lucide-react";
import { useSessionTimer } from "../models/use-session-timer";

interface Props {
    startTime: number;
}

export function SessionTimer({ startTime }: Props) {
    const { timeString, isMounted } = useSessionTimer(startTime);
    if (!isMounted) return null;
    return(
        <div className="grid gap-3">
            <div className="flex items-end justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Время в системе</span>
                <Clock className="w-4 h-4 text-zinc-600" /> 
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-light text-white tracking-tight">
                            {timeString}
                        </div>
                        <div className="text-xs text-emerald-400/70 mt-1">
                            Online
                        </div>
                    </div>
                    <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-white/5">
                         <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin duration-[3s]"></div>
                         <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
                    </div>
                </div>
                <div className="flex items-end justify-between h-2 gap-1 mt-4 opacity-50">
                    <div className="w-full bg-emerald-500/20 rounded-full h-[2px]"></div>
                    <div className="w-full bg-emerald-500/40 rounded-full h-[2px]"></div>
                    <div className="w-full bg-emerald-500/60 rounded-full h-[2px]"></div>
                    <div className="w-full bg-emerald-500/80 rounded-full h-[2px]"></div>
                </div>
            </div>
        </div>
    );
};