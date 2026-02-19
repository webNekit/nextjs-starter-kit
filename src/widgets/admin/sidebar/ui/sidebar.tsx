"use client"

import { Navigation } from "./navigation";
import { BackendStatus } from "@/features/status";
import { SessionTimer } from "@/entities/session";
import { LogoutForm } from "@/features/auth/logout/ui/logout-form";
import { Info } from "./info";

interface Props {
    timer?: number;
}

export function Sidebar({ timer }: Props) {
    return (
        <aside className="flex">
            <div className="py-6 w-18 flex flex-col items-center glass-sidebar z-30 shrink-0 relative" id="primary-sidebar">
                <div className="text-white font-medium text-xl tracking-tighter opacity-90 hover:opacity-100 transition-opacity cursor-pointer" id="sidebar-logo">My.</div>
                <Navigation />
                <div className="mt-auto" id="sidebar-actions">
                    <LogoutForm />
                </div>
            </div>
            <div className="w-80 glass-sidebar flex-col z-20 hidden sm:flex relative border-r border-white/5" id="secondary-sidebar">
                <BackendStatus />
                <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
                    <SessionTimer startTime={timer || Date.now()} />
                </div>
                <Info />
            </div>
        </aside>
    );
}