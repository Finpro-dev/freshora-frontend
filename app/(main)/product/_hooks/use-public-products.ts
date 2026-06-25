import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios-instance";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { Product } from "@/shared/types/product-type";

export interface ProductsResponse {
  status: string;
  data: (Product & {
    finalPrice: number;
    stocks: { quantity: number }[];
    productCategory: { productCategoryId: string; category: string };
  })[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  stats: {
    totalOutOfStock: number;
  };
  categories: { productCategoryId: string; category: string }[];
}

interface UsePublicProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export function usePublicProducts(params?: UsePublicProductsParams) {
  return useQuery<ProductsResponse>({
    queryKey: ["public-products", params],
    queryFn: async () => {
      const cleanParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => {
          return value !== undefined && value !== "" && value !== "all";
        }),
      );

      const { data } = await api.get<ProductsResponse>(
        `${CORS_CREDENTIALS.API_BASE_URL}/products/`,
        { params: cleanParams },
      );

      return data;
    },
  });
}
