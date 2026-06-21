"use client";

import { createNewPassword } from "@/actions/create-new-password";
import SubmitButton from "@/shared/components/SubmitButton";
import {
  CreatePasswordInput,
  createPasswordSchema,
} from "@/shared/schemas/create-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import VerifyCreatePasswordNavigation from "./VerifyCreatePasswordNavigation";

function VerifyCreatePasswordForm() {
  const searchParams = useSearchParams();
  const token = String(searchParams.get("token"));

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
    const res = await createNewPassword(password, confirmPassword, token);

    if (!res.success) {
      toast.error(res.error);
    } else {
      toast.success("New password has been set successfully!");
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
        <VerifyCreatePasswordNavigation
          isShowPassword={isShowPassword}
          onShowPassword={handleShowPassword}
        />
      </div>

      <SubmitButton isSubmitting={isSubmitting} pendingLabel="Processing...">
        Create new password
      </SubmitButton>
    </form>
  );
}

export default VerifyCreatePasswordForm;
