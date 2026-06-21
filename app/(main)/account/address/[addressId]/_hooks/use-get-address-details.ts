import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetAddressDetails = (addressId: string) => {
  const addressDetailsQuery = useQuery({
    queryKey: ["address-details", addressId],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/addresses/${addressId}`,
      );

      return data.data;
    },
  });

  return addressDetailsQuery;
};
