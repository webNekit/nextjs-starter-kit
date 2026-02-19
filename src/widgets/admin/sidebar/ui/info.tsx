import { STARTER_CONFIG } from "@/shared/config/starter.config";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import Link from "next/link";

export function Info() {
    return(
        <div className="p-6 pt-0 mt-auto grid gap-3">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Информация о проекте</span>
                <Link className="text-xs font-medium text-white uppercase" href={APP_ROUTES.ADMIN.PROJECT()}>Подробнее</Link>
            </div>
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                <p className="text-xs text-rose-200 font-medium">{STARTER_CONFIG.name}</p>
                <p className="text-[10px] text-rose-300/60 mt-0.5">{STARTER_CONFIG.description}</p>
            </div>
            <div className="text-xs font-medium text-zinc-500 tracking-wider text-center">v{STARTER_CONFIG.version}</div>
        </div>
    );
}