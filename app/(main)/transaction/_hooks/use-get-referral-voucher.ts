import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetReferralVoucher = () => {
  const getReferralVoucherQuery = useQuery({
    queryKey: ["referral-voucher"],
    queryFn: async () => {
      const { data } = await api.get(`/profile/referral-vouchers`);

      return data;
    },
  });

  return getReferralVoucherQuery;
};
