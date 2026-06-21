import { useQuery } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

export function useGetUser() {
  const getUserQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get(`${CORS_CREDENTIALS.API_BASE_URL}/users`);

      return data;
    },
  });

  return getUserQuery;
}
