import { VerifyNavigationProps } from "@/shared/types/verify-navigation-props-type";
import { useResendVerifyRequest } from "../_hooks/use-resend-verify-request";

function VerifyCreatePasswordNavigation({
  onShowPassword,
  isShowPassword,
}: VerifyNavigationProps) {
  const { mutate, isPending } = useResendVerifyRequest();

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
          onClick={() =>
            mutate({ email: undefined, verifyType: "VERIFY_PASSWORD" })
          }
          className="text-xs cursor-pointer disabled:cursor-not-allowed text-brand-emerald-700">
          Resend.
        </button>
      </div>
    </div>
  );
}

export default VerifyCreatePasswordNavigation;
