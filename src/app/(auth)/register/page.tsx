import { RegisterForm } from "@/features/auth/register/ui/register-form";
import { requireGuest } from "@/shared/auth/guards";
import { DoorOpen } from "lucide-react";

export default async function AuthRegisterPage() {
    await requireGuest();
    return (
        <div className="relative group">
            <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 mb-5 text-zinc-100 shadow-inner">
                        <DoorOpen size={18} />
                    </div>
                    <h1 className="text-2xl font-medium text-white tracking-tight mb-2">Регистрация</h1>
                    <p className="text-base text-zinc-400 font-normal">
                        Создайте новый аккаунт или авторизуйтесь, чтобы продолжить.
                    </p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
}