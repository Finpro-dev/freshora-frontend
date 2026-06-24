import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetUserAddresses = () => {
  const getUserAddresses = useQuery({
    queryKey: ["user-addresses"],
    queryFn: async () => {
      const { data } = await api.get(`/addresses`);
      return data;
    },
  });

  return getUserAddresses;
};
