"use client";

import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "../../_schemas/login-schema";
import AuthNavigation from "./AuthNavigation";

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { loginMutation, isLoggingIn } = useAuth();

  const handleShowPassword = () => {
    setIsShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const res = loginMutation(data);
    console.log(res);
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
        disabled={isLoggingIn}
        type="submit"
        className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 disabled:bg-brand-mist-500 disabled:cursor-not-allowed cursor-pointer">
        {isLoggingIn ? "Hold on..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
