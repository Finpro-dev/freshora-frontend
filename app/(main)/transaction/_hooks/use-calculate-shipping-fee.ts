import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetShippingFee = (
  userDistrictId: number,
  storeDistrictId: number,
  courier: string,
  weight: number,
) => {
  const getShippingFee = useQuery({
    queryKey: ["shipping-fee", courier],
    queryFn: async () => {
      const { data } = await api.post(`/shipping/cost`, {
        origin: storeDistrictId,
        destination: userDistrictId,
        weight,
        courier,
      });

      return data;
    },

    enabled: !!userDistrictId && !!storeDistrictId && !!courier && !!weight,
  });

  return getShippingFee;
};
