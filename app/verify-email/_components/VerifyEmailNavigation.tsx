"use client";

import { useResendVerifyRequest } from "../_hooks/use-resend-verify-request";
import { VerifyEmailNavigationProps } from "../_types/verify-email-type";

function VerifyEmailNavigation({
  onShowPassword,
  isShowPassword,
}: VerifyEmailNavigationProps) {
  const { mutate } = useResendVerifyRequest();

  return (
    <div>
      <div className="flex gap-2 items-center justify-between">
        <div>
          <button
            type="button"
            onClick={onShowPassword}
            className="text-xs text-brand-mist-700 cursor-pointer">
            {isShowPassword ? "Hide password" : "Show password"}
          </button>
        </div>
      </div>

      <div className="flex gap-1">
        <p className="text-xs text-brand-mist-700">
          Haven&apos;t received any email?
        </p>
        <button
          type="button"
          onClick={() => mutate(undefined)}
          className="text-xs cursor-pointer text-brand-emerald-700">
          Resend.
        </button>
      </div>
    </div>
  );
}

export default VerifyEmailNavigation;
