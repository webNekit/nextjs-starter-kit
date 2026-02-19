"use client";

import { useRegisterForm } from "../use-register-form";
import { registerAction } from "../register.action";
import { useActionState } from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/shared/routes/app-routes";
import { Image } from "lucide-react";

export function RegisterForm() {
  const { register, formState: { errors } } = useRegisterForm();

  const [state, formAction, isPending] = useActionState(registerAction, {
    errors: [],
    success: false
  });


  return (
    <form action={formAction} className="space-y-2">
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300 ml-0.5">
          Ваше имя
        </label>
        <div className="relative group/input">
          <input
            {...register("fullName")}
            type="text"
            id="fullName"
            placeholder="Введите имя"
            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-base text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all hover:border-white/15"
          />
        </div>
      </div>
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
      <div className="space-y-2">
        <label htmlFor="file" className="block text-sm font-medium text-zinc-300 cursor-pointer">
          Изображение
          <div className="p-5 mt-2 w-full flex items-center gap-4 rounded-lg bg-white/5 border border-white/[0.5] border-dashed">
            <Image size={18} />
            <span className="text-zinc-600">Выберите изображение</span>
          </div>
        </label>
        <div className="relative group/input">
          <input
            {...register("file")}
            type="file"
            id="file"
            placeholder="Введите пароль"
            className="hidden"
          />
        </div>
      </div>
      <p className="text-sm text-zinc-500 leading-relaxed">
        Продолжая, вы подтверждаете согласие с условиями использования и политикой конфиденциальности.
      </p>
      <button type="submit" className="block w-full bg-white text-black font-medium text-base py-3 rounded-lg hover:bg-zinc-200 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white/80 active:scale-[0.99] transform duration-100 cursor-pointer">Зарегистрироваться</button>
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-500">
          Уже есть аккаут? {" "}
          <Link href={APP_ROUTES.AUTH.LOGIN()} className="text-white hover:text-zinc-200 font-medium hover:underline transition-all underline-offset-4 decoration-white/30">
            Авторизуйтесь
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
    // <form action={formAction}
    //   encType="multipart/form-data"
    //   className="grid gap-y-4"
    // >
    //   <input {...form.register("fullName")} placeholder="Имя" />
    //   {errors.fullName && <p>{errors.fullName.message}</p>}

    //   <input {...form.register("email")} type="email" placeholder="Email" />
    //   {errors.email && <p>{errors.email.message}</p>}

    //   <input {...form.register("password")} type="password" placeholder="Пароль" />
    //   {errors.password && <p>{errors.password.message}</p>}

    //   <input type="file" {...form.register("file")} /> {/* Multer ждет поле file */}
    //   {errors.file && <p>{errors.file.message}</p>}

    //   <button type="submit">Зарегистрироваться</button>
    // </form>
  );
}
