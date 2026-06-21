"use client";

import { sendEmailVerification } from "@/actions/send-email-verification";
import Button from "@/shared/components/Button";
import { useActionState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { toast } from "sonner";

interface VerificationAlertProps {
  email: string;
}

function VerificationAlert({ email }: VerificationAlertProps) {
  const handleSendEmailVerification = async () => {
    const toastId = toast("Sending ...");

    const res = await sendEmailVerification(email);
    if (!res.success) {
      toast.error(res.error, { id: toastId });
    } else {
      toast.success("Verification link has been sent to your email!", {
        id: toastId,
      });
    }
  };

  const [_state, formAction, isPending] = useActionState(
    handleSendEmailVerification,
    null,
  );
  return (
    <div className="flex items-center gap-1 mt-5 px-5 py-5 rounded-sm shadow-sm shadow-orange-300/20 border border-brand-mist-100 ">
      <div className="text-xl sm:text-2xl pr-2 text-yellow-600">
        <MdNotificationsActive />
      </div>
      <div>
        <p className="text-yellow-600 text-xs sm:text-sm">
          You email is not verified yet.
        </p>
      </div>

      <form action={formAction}>
        <Button
          btnType="text"
          disabled={isPending}
          type="submit"
          className="text-yellow-800 hover:underline hover:cursor-pointer text-xs sm:text-sm disabled:cursor-not-allowed">
          {isPending ? "Hold on..." : "Verify now"}
        </Button>
      </form>
    </div>
  );
}

export default VerificationAlert;
