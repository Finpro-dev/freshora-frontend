import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { api } from "@/shared/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
      toast.success(
        "Account verified successfully, directing to login page...",
        {
          id: context.toastId,
        },
      );

      router.replace("/login");
      router.refresh();
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
