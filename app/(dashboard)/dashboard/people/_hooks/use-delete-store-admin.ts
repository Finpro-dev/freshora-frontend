import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
export function useDeleteStoreAdmin() {
  const queryClient = useQueryClient();
  const deleteStoreAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await api.delete(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/store-admin/${userId}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return deleteStoreAdminMutation;
}
