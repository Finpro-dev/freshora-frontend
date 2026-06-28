"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios-instance";
import { Product } from "@/shared/types/product-type";

export interface ProductDetailResponse {
  status: string;
  data: Product & {
    finalPrice: number;
    stocks: { quantity: number }[];
    productCategory: { productCategoryId: string; category: string };
  };
}

interface UseProductBySlugParams {
  slug: string;
}

export function useGetProductBySlug({ slug }: UseProductBySlugParams) {
  return useQuery<ProductDetailResponse>({
    queryKey: ["product", "slug", slug],
    queryFn: async () => {
      const { data } = await api.get<ProductDetailResponse>(
        `/products/slug/${encodeURIComponent(slug)}`,
      );
      return data;
    },
    enabled: !!slug,
    retry: false,
  });
}
