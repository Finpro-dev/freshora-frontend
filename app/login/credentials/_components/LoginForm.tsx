"use client";

import { loginUser } from "@/actions/login-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "../../_schema/loginSchema";
import AuthNavigation from "./AuthNavigation";
import { redirect } from "next/navigation";

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await loginUser(data);
    console.log(res);
    if (res) redirect("/", "replace");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <input
          {...register("email")}
          name="email"
          type="text"
          placeholder="Enter email"
          className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
        />

        {errors.email && (
          <p className="pt-2 text-xs text-red-700">{errors.email.message}</p>
        )}
      </div>
      <div>
        <input
          {...register("password")}
          name="password"
          type={isShowPassword ? "text" : "password"}
          placeholder="Enter password"
          className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
        />
        {errors.password && (
          <p className="pt-2 text-xs text-red-700">{errors.password.message}</p>
        )}
      </div>

      <AuthNavigation
        onShowPassword={handleShowPassword}
        isShowPassword={isShowPassword}
      />

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 disabled:bg-brand-mist-500 cursor-pointer">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
