import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetFreeShippingVoucher = () => {
  const getFreeShippingVoucherQuery = useQuery({
    queryKey: ["free-shipping-voucher"],
    queryFn: async () => {
      const { data } = await api.get(`/free-shipping-vouchers/user`, {});

      return data;
    },
  });

  return getFreeShippingVoucherQuery;
};
