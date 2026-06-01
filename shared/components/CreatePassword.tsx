"use client";

import {
  CreatePasswordInput,
  createPasswordSchema,
} from "@/shared/schemas/create-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { verifyEmailTokenProps } from "../types/verify-email.types";

function CreatePassword({
  tokenProps,
  handleSubmitPassword,
}: verifyEmailTokenProps) {
  const { token: tokenParams } = useParams<Record<string, string>>();
  const token = tokenProps || tokenParams;

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<CreatePasswordInput>({
    resolver: zodResolver(createPasswordSchema),
  });

  const onSubmit = handleSubmit(async ({ password, confirmPassword }) => {
    await handleSubmitPassword(password, confirmPassword, token);
    resetField("password");
    resetField("confirmPassword");
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
      <div>
        <input
          {...register("confirmPassword")}
          name="confirmPassword"
          type={isShowPassword ? "text" : "password"}
          placeholder="Confirm password"
          className="input w-full border border-brand-mist-300 text-brand-mist-700  focus:outline-none focus:border-brand-mist-400"
        />
        {errors.confirmPassword && (
          <p className="pt-2 text-xs text-red-700">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={handleShowPassword}
          className="text-xs text-brand-mist-700 cursor-pointer">
          {isShowPassword ? "Hide password" : "Show password"}
        </button>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 disabled:bg-brand-mist-500 cursor-pointer">
        Create new password
      </button>
    </form>
  );
}

export default CreatePassword;
