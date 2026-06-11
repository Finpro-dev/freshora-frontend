import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { api } from "@/shared/lib/axios-instance";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogoutUser() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post(
        `${CORS_CREDENTIALS.API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
    },

    // before hitting api
    onMutate: () => {
      const toastId = toast.loading("Logging out...");
      return { toastId };
    },

    // after hitting api
    onSuccess: (_data, _variables, context) => {
      clearAuth();
      toast.success("Logout successful, See ya", {
        id: context.toastId,
      });

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

  return logoutMutation;
}
