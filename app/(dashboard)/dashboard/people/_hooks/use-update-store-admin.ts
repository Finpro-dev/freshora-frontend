import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateStoreAdminPayload {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  gender: string;
}
export function useUpdateStoreAdmin() {
  const queryClient = useQueryClient();
  const updateStoreAdminMutation = useMutation({
    mutationFn: async ({ userId, ...body }: UpdateStoreAdminPayload) => {
      const { data } = await api.patch(`/admin/store-admin/${userId}`, body);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-admin"] });
    },
  });
  return updateStoreAdminMutation;
}
