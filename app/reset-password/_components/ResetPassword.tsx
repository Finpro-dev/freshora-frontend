"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmailInput, emailSchema } from "../_schema/reset-password-schema";
import { forgotPassword } from "@/actions/forgot-password";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    await forgotPassword(email);
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
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 disabled:bg-brand-mist-500 cursor-pointer">
        Send reset link
      </button>
    </form>
  );
}

export default ResetPassword;
