import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetCartItems = () => {
  const getCartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await api.get(`/cart`);

      return data;
    },
  });

  return getCartQuery;
};
