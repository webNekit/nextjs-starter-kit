import Link from "next/link";
import { UserRole } from "@/entities/users/users.type";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import { LogoutForm } from "@/features/auth/logout/ui/logout-form";

interface Props {
    user?: any;
}

export function Header({ user }: Props) {
    const profileHref = user ? user.role === UserRole.ADMIN ? APP_ROUTES.ADMIN.HOME() : APP_ROUTES.PROFILE() : null;
    return(
        <nav className="fixed backdrop-blur-lg top-0 left-0 w-full z-50 pt-6 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-red-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <span className="text-xl font-medium tracking-tight text-white group-hover:text-red-100 transition-colors">AetherMind</span>
            </div>
            <div className="hidden md:flex items-center gap-1 glass-nav px-2 py-1.5 rounded-full shadow-lg shadow-red-900/5">
              <Link href={APP_ROUTES.HOME()} className="px-5 py-2 text-sm text-white bg-white/10 rounded-full border border-white/5 transition-all shadow-[0_0_10px_rgba(255,0,0,0.1)]">Главная</Link>
            </div>
            <div>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href={profileHref!} className="block glass-nav px-6 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white transition-all hover:bg-red-500/10 border border-red-500/10 shadow-lg shadow-black/20 group">
                    <span className="flex items-center gap-2">
                    {user.role === UserRole.ADMIN ? "Админ-панель" : "Профиль"}
                    </span>
                  </Link>
                  <LogoutForm />
                </div>
              ) : (
                <Link href={APP_ROUTES.AUTH.LOGIN()} className="block glass-nav px-6 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white transition-all hover:bg-red-500/10 border border-red-500/10 shadow-lg shadow-black/20 group">
                  <span className="flex items-center gap-2">
                    Войти
                  </span>
                </Link>
              )}

            </div>
          </div>
        </nav>
    );
}