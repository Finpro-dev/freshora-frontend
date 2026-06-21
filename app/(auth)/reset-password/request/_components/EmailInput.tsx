"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useResendResetPasswordRequest } from "../../_hooks/use-resend-reset-password-request";
import { EmailInput, emailSchema } from "../../_schema/reset-password-schema";
import Button from "@/shared/components/Button";

function ResetPassword() {
  const { mutateAsync, isPending } = useResendResetPasswordRequest();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    await mutateAsync(email);
    resetField("email");
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
      <Button btnType="primary" disabled={isPending} type="submit">
        {isPending ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
}

export default ResetPassword;
