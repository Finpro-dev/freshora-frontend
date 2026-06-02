"use client";

import { useSearchParams } from "next/navigation";
import { useVerifyEmailOnly } from "../_hooks/use-verify-email-only";
import { useResendVerifyRequest } from "../_hooks/use-resend-verify-request";

function VerifyOnly() {
  const searhParams = useSearchParams();
  const token = String(searhParams.get("token"));
  const { mutate: verifyEmail, isPending } = useVerifyEmailOnly();
  const { mutate: resendVerify } = useResendVerifyRequest();

  return (
    <>
      <button
        disabled={isPending}
        onClick={() => verifyEmail(token)}
        className="w-full h-10 flex items-center justify-center bg-brand-emerald-700 text-brand-mist-200 hover:bg-brand-emerald-800 disabled:bg-brand-mist-500 cursor-pointer">
        Yes, it&apos;s me
      </button>

      <div className="flex justify-center gap-1">
        <p className="text-xs text-brand-mist-700">Link expired?</p>
        <button
          type="button"
          onClick={() =>
            resendVerify({ email: undefined, verifyType: "VERIFY_ONLY" })
          }
          className="text-xs cursor-pointer text-brand-emerald-700">
          Resend.
        </button>
      </div>
    </>
  );
}

export default VerifyOnly;
