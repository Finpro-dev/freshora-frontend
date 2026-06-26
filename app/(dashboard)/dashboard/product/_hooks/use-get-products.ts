import { useQuery } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

// 1. Definisikan tipe data parameter yang diterima dari frontend
interface UseGetAllProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export function useGetAllProducts(params?: UseGetAllProductsParams) {
  return useQuery({
    queryKey: ["products", params],

    queryFn: async () => {
      const cleanParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => {
          return value !== undefined && value !== "" && value !== "all";
        }),
      );

      const { data } = await api.get(`/products`, {
        params: cleanParams,
      });

      return data;
    },
  });
}
