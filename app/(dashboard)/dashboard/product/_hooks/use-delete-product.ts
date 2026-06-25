import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await api.delete(
        `${CORS_CREDENTIALS.API_BASE_URL}/products/delete/${productId}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return deleteProductMutation;
}
