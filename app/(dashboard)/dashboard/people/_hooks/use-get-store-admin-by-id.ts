import { useQuery } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

export function useGetStoreAdminById(userId: string) {
  const getUserQuery = useQuery({
    queryKey: ["store-admin"],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/users/${userId}`,
      );

      return data;
    },
  });

  return getUserQuery;
}
