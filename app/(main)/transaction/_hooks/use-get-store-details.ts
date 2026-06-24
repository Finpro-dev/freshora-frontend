import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetStoreDetails = (storeId: string) => {
  const getStoreDetailsQuery = useQuery({
    queryKey: ["store-details"],
    queryFn: async () => {
      const { data } = await api.get(`/stores/${storeId}`);

      return data;
    },

    enabled: !!storeId,
  });

  return getStoreDetailsQuery;
};
