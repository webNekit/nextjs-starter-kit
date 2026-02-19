"use client";

import { useCreateUsersForm } from "../hooks/use-create-users-form";
import { createUserAction } from "../../action";
import { UserRole } from "@/entities/users/users.type";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2 } from "lucide-react";

export function CreateUsersForm() {
    const { register, formState: { errors } } = useCreateUsersForm();
    const [state, formAction, isPending] = useActionState(createUserAction, { error: "" });
    return (
        <form action={formAction} className="max-w-6xl mx-auto">
            {state?.errors && Array.isArray(state.errors) && state.errors.length > 0 && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-left">
                    <ul className="list-disc pl-4 space-y-1">
                        {state.errors.map((err, index) => (
                            <li key={index} className="text-xs text-rose-200 font-medium">{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="grid gap-y-12">
                <div className="w-full">
                    <label htmlFor="fullName" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                        Имя пользователя
                    </label>
                    <input
                        {...register("fullName")}
                        type="text"
                        id="fullName"
                        placeholder="Андрей Рублев"
                        className="w-full bg-transparent text-4xl md:text-5xl font-semibold text-white placeholder-zinc-700 focus:outline-none tracking-tight leading-tight border-b border-white/10 pb-2 transition-all focus:border-rose-500/50"
                    />
                </div>
                <div className="flex items-center gap-8">
                    <div>
                        <label htmlFor="file" className="cursor-pointer group">
                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center relative overflow-hidden bg-white/[0.02] group-hover:border-rose-500/50 transition-colors">
                                <ImageIcon className="w-8 h-8 text-zinc-600 group-hover:text-white transition-colors" />
                            </div>
                        </label>
                        <input
                            {...register("file")}
                            type="file"
                            className="hidden"
                            id="file"
                            accept="image/*"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-medium text-lg">Загрузите изображение</h3>
                        <p className="text-sm text-zinc-500 max-w-sm mt-1">
                            Загрузите изображение в высоком разрешении. Максимальный размер - 5 МБ.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                            Адрес эл.почты
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            id="email"
                            placeholder="user@example.com"
                            className="p-3 w-full rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-rose-500/50 focus:bg-white/[0.05] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                            Пароль
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            id="password"
                            placeholder="*******"
                            className="p-3 w-full rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-rose-500/50 focus:bg-white/[0.05] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wider">
                            Роль
                        </label>
                        <div className="relative">
                            <select {...register("role")} id="role" defaultValue="" className="p-3 w-full text-white text-sm rounded-xl bg-white/[0.03] border border-white/10 focus:outline-none focus:border-rose-500/50 appearance-none cursor-pointer transition-all"
                            >
                                <option value="" disabled className="bg-[#0B0E14] text-zinc-500">Выберите роль</option>
                                <option value={UserRole.USER} className="bg-[#0B0E14]">Пользователь</option>
                                <option value={UserRole.ADMIN} className="bg-[#0B0E14]">Администратор</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6 border-t border-white/5">
                    <Button type="submit" disabled={isPending} className="bg-white text-black hover:bg-zinc-200 px-8 py-6 rounded-xl text-base font-medium">
                        {isPending ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Создание...</>
                        ) : ("Создать пользователя")}
                    </Button>
                </div>
            </div>
        </form>
    );
}