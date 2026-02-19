import { LoginForm } from "@/features/auth/login/ui/login-form";
import { DoorOpen } from "lucide-react";

export default function AuthLoginPage() {
    return (
        <div className="relative group">
            <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 mb-5 text-zinc-100 shadow-inner">
                        <DoorOpen size={18} />
                    </div>
                    <h1 className="text-2xl font-medium text-white tracking-tight mb-2">
                        Вход в систему
                    </h1>
                    <p className="text-base text-zinc-400 font-normal">
                        Авторизуйтесь или создайте новый аккаунт, чтобы продолжить.
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}
