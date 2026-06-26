import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (storeId: string) => {
  const getProductQuery = useQuery({
    queryKey: ["product", storeId],
    queryFn: async () => {
      const { data } = await api.get(
        `/products/store/${storeId}?page=${1}&limit=${8}`,
      );

      return data;
    },
    enabled: !!storeId,
  });

  return getProductQuery;
};
