"use client";

import {
  CreatePasswordInput,
  createPasswordSchema,
} from "@/shared/schemas/create-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { verifyEmailTokenProps } from "../types/verify-email.types";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";
import VerifyEmailNavigation from "@/app/verify-email/_components/VerifyEmailNavigation";

function CreatePassword({
  tokenProps,
  handleSubmitPassword,
}: verifyEmailTokenProps) {
  const searchParams = useSearchParams();
  const tokenParams = String(searchParams.get("token"));
  const verifyType = String(searchParams.get("verifyType"));

  const token = tokenProps || tokenParams;

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePasswordInput>({
    resolver: zodResolver(createPasswordSchema),
  });

  const onSubmit = handleSubmit(async ({ password, confirmPassword }) => {
    const res = await handleSubmitPassword(password, confirmPassword, token);

    if (!res.success) {
      toast.error(res.error);
    } else {
      toast.success(
        verifyType === "VERIFY_PASSWORD"
          ? "Your account verified & password set successfully!"
          : "Your email verified successfully",
      );

      redirect("/", "replace");
    }
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
        <VerifyEmailNavigation
          isShowPassword={isShowPassword}
          onShowPassword={handleShowPassword}
        />
      </div>

      <SubmitButton isSubmitting={isSubmitting} pendingLable="Processing...">
        Create new password
      </SubmitButton>
    </form>
  );
}

export default CreatePassword;
