"use client";

import { Input } from "@/components/ui/input";
import { loginAction } from "../login.action";
import { Label } from "@/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "../use-login-form";
import { useActionState } from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/shared/routes/app-routes";

interface Props {
    title?: string;
    subtitle?: string;
    className?: string;
}

export const LoginForm: React.FC<Props> = ({ title = "Авторизация", subtitle = "Авторизуйтесь, чтобы продолжить работу", className }) => {
    const { register, formState: { errors } } = useLoginForm();
    const [state, formAction, isPending] = useActionState(loginAction, { error: "" });
    return (
        <form action={formAction} className="space-y-2">
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 ml-0.5">
                    Электронная почта
                </label>
                <div className="relative group/input">
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        placeholder="example@mail.com"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all hover:border-white/15"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300 ml-0.5">
                    Введите пароль
                </label>
                <div className="relative group/input">
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                        placeholder="Введите пароль"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all hover:border-white/15"
                    />
                </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
                Продолжая, вы подтверждаете согласие с условиями использования и политикой конфиденциальности.
            </p>
            <button type="submit" className="block w-full bg-white text-black font-medium text-base py-3 rounded-lg hover:bg-zinc-200 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/80 active:scale-[0.99] transform duration-100 cursor-pointer">Войти</button>
            <div className="mt-8 text-center">
                <p className="text-sm text-zinc-500">
                    Ещё нет аккаунта?{" "}
                    <Link href={APP_ROUTES.AUTH.REGISTER()} className="text-white hover:text-zinc-200 font-medium hover:underline transition-all underline-offset-4 decoration-white/30">
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
            {state?.errors && Array.isArray(state.errors) && state.errors.length > 0 && (
                <div className="text-red-900">
                    <ul className="list-disc pl-4 space-y-1">
                        {state.errors.map((err, index) => (
                            <li key={index} className="text-xs text-rose-200 font-medium">{err}</li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};