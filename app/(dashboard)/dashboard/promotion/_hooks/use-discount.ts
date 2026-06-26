import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

export type DiscountType =
  | "BUY_ONE_GET_ONE"
  | "MIN_TRANSACTION"
  | "NO_REQUIREMENT";
export type DiscountValueType = "PERCENTAGE" | "NOMINAL";
export type DiscountStatus = "ACTIVE" | "EXPIRED" | "UPCOMING";

export interface ProductSummary {
  productId: string;
  name: string;
  price: string | number;
  serialNumber?: string;
  productPhotos?: { photoUrl: string }[];
  category?: { name: string };
}

export interface DiscountData {
  discountId: string;
  productId: string | null;
  storeId: string | null;
  type: DiscountType;
  valueType: DiscountValueType;
  discountAmount: string | number;
  minTransaction: string | number | null;
  maxDiscount: string | number | null;
  validFrom: string;
  validUntil: string;
  product: ProductSummary | null;
}

export interface DiscountQueryParams {
  page?: number;
  limit?: number;
  type?: DiscountType | string;
  status?: DiscountStatus | string;
}

export interface CreateDiscountPayload {
  productId?: string | null;
  storeId?: string | null;
  type: DiscountType;
  valueType: DiscountValueType;
  discountAmount: number;
  minTransaction?: number | null;
  maxDiscount?: number | null;
  validFrom: Date | string;
  validUntil: Date | string;
}

interface BackendResponse<T> {
  status: string;
  message?: string;
  data: T;
}

interface PaginatedDiscountResult {
  meta: { page: number; limit: number; totalData: number; totalPages: number };
  data: DiscountData[];
}

const BASE_DISCOUNT_URL = `${CORS_CREDENTIALS.API_BASE_URL}/admin/discounts`;

export function useGetDiscounts(params?: DiscountQueryParams) {
  return useQuery({
    queryKey: ["discounts", params],
    queryFn: async () => {
      const { data } = await api.get<BackendResponse<PaginatedDiscountResult>>(
        `/admin/discounts`,
        { params: params || {} },
      );
      return data.data;
    },
  });
}

export function useCreateDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateDiscountPayload) => {
      const { data } = await api.post<BackendResponse<DiscountData>>(
        `/admin/discounts/create-discount`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
    },
  });
}

export function useDeleteDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (discountId: string) => {
      const { data } = await api.delete<BackendResponse<any>>(
        `/admin/discounts/${discountId}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
    },
  });
}

export function useGetProducts(params: {
  page: number;
  limit: number;
  search: string;
  category?: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["discount-global-products", params],
    queryFn: async () => {
      const { data } = await api.get(`/products`, { params });
      return data;
    },
    enabled: params.enabled ?? true,
  });
}

export function useGetStoreStocks(params: {
  storeId?: string | null;
  page: number;
  limit: number;
  search: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["discount-store-stocks", params.storeId, params],
    queryFn: async () => {
      if (!params.storeId) {
        return {
          data: [],
          pagination: { page: 1, limit: params.limit, total: 0, totalPages: 0 },
        };
      }

      // PERBAIKAN: Pisahkan 'enabled' agar tidak ikut terkirim ke backend
      const { enabled, ...apiParams } = params;

      const { data } = await api.get(
        `/admin/inventory`,
        { params: apiParams }, // Hanya kirim parameter yang dibutuhkan backend
      );
      return data;
    },
    enabled: params.enabled ?? !!params.storeId,
  });
}
