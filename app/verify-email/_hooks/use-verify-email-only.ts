import { CORS_CREDENTIALS } from "@/config/dotenv-config";
import { api } from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";

export function useVerifyEmailOnly() {
  const router = useRouter();
  const verifyEmailOnlyMutation = useMutation({
    mutationFn: async (token: string) => {
      const { data } = await api.patch(
        `${CORS_CREDENTIALS.API_BASE_URL}/users/verify-email/${token}`,
      );

      return data;
    },

    onMutate: () => {
      const toastId = toast.loading("Verifying...");

      return { toastId };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success("Accout verified successfully", {
        id: context.toastId,
      });

      router.replace("/");
    },

    onError: (error: any, _variables, context) => {
      const errorMessage =
        error.response?.data?.message || "There's an issue with the server";
      toast.error(errorMessage, {
        id: context?.toastId,
      });
    },
  });

  return verifyEmailOnlyMutation;
}
