import { useQuery } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

export function useGetUser() {
  const getUserQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/users`);

      return data;
    },
  });

  return getUserQuery;
}
