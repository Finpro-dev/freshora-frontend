import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { api } from "@/shared/lib/axios-instance";
import { EmailVerifyType } from "@/shared/types/email-verify-type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useResendVerifyRequest() {
  const resendVerifyRequestMutation = useMutation({
    mutationFn: async ({
      email,
      verifyType,
    }: {
      email?: string;
      verifyType?: EmailVerifyType;
    }) => {
      const { data } = await api.post(
        `${CORS_CREDENTIALS.API_BASE_URL}/auth/verify-request`,
        { email, verifyType },
      );

      return data;
    },

    // before hitting api
    onMutate: () => {
      const toastId = toast.loading("Sending email...");
      return { toastId };
    },

    // after hitting api
    onSuccess: (_data, _variables, context) => {
      toast.success("New verification email has been sent", {
        id: context.toastId,
      });
    },

    onError: (error: any, _variables, context) => {
      const errorMessage =
        error.response?.data?.message || "There's an issue with the server";
      toast.error(errorMessage, {
        id: context?.toastId,
      });
    },
  });

  return resendVerifyRequestMutation;
}
