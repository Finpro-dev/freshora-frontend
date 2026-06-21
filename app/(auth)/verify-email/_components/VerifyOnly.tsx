"use client";

import { useSearchParams } from "next/navigation";
import { useVerifyEmailOnly } from "../_hooks/use-verify-email-only";
import { useResendVerifyRequest } from "../_hooks/use-resend-verify-request";
import Button from "@/shared/components/Button";

function VerifyOnly() {
  const searhParams = useSearchParams();
  const token = String(searhParams.get("token"));
  const { mutate: verifyEmail, isPending } = useVerifyEmailOnly();
  const { mutate: resendVerify } = useResendVerifyRequest();

  return (
    <>
      <Button
        btnType="primary"
        disabled={isPending}
        onClick={() => verifyEmail(token)}>
        Yes, it&apos;s me
      </Button>

      <div className="flex justify-center gap-1 text-xs">
        <p className="text-brand-mist-700">Link expired?</p>

        <Button
          btnType="text"
          type="button"
          disabled={isPending}
          onClick={() =>
            resendVerify({ email: undefined, verifyType: "VERIFY_ONLY" })
          }
          textColor="text-brand-emerald-700"
          hoverTextColor="text-brand-emerald-800">
          Resend.
        </Button>
      </div>
    </>
  );
}

export default VerifyOnly;
