import { VerifyNavigationProps } from "@/shared/types/verify-navigation-props-type";
import { useResendResetPasswordRequest } from "../_hooks/use-resend-reset-password-request";
import Button from "@/shared/components/Button";

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

      <div className="flex gap-1 text-xs">
        <p className="text-brand-mist-700">Link expired?</p>

        <Button
          btnType="text"
          type="button"
          disabled={isPending}
          onClick={() => mutate(undefined)}
          textColor="text-brand-emerald-700"
          hoverTextColor="text-brand-emerald-800">
          Resend.
        </Button>
      </div>
    </div>
  );
}

export default ResetPasswordNavigation;
