"use client";

import { loginUser } from "@/actions/login-user";
import SubmitButton from "@/shared/components/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginInput, loginSchema } from "../../_schemas/login-schema";
import AuthNavigation from "./AuthNavigation";
import { Router } from "next/router";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isShowPassword, setIsShowPassword] = useState(false);

  // fixme ->> role base redirect
  const callbackUrl = searchParams.get("callback") || "/";

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

    if (!res.success) {
      toast.error(res.error);
    } else {
      toast.success("You are logging in!");
      router.push(callbackUrl);
    }
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

      <SubmitButton isSubmitting={isSubmitting} pendingLable="Submitting...">
        Login
      </SubmitButton>
    </form>
  );
}

export default LoginForm;
