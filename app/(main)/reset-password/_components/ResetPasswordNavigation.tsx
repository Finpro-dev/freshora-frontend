import { VerifyNavigationProps } from "@/shared/types/verify-navigation-props-type";
import { useResendResetPasswordRequest } from "../_hooks/use-resend-reset-password-request";

function ResetPasswordNavigation({
  onShowPassword,
  isShowPassword,
}: VerifyNavigationProps) {
  const { mutate, isPending } = useResendResetPasswordRequest();
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
        <p className="text-xs text-brand-mist-700">Link expired?</p>

        <button
          type="button"
          disabled={isPending}
          onClick={() => mutate(undefined)}
          className="text-xs cursor-pointer disabled:cursor-not-allowed text-brand-emerald-700">
          Resend.
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordNavigation;
