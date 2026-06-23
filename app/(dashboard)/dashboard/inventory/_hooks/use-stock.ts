import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

// --- INTERFACES ---
export interface Product {
  productId: string;
  name: string;
  serialNumber: string;
  finalPrice?: number | string;
  unit?: string;
  weightPerGram?: number;
  grade?: string;
  productPhotos?: { photoUrl: string }[];
  productCategory?: { category: string };
}

export interface StoreData {
  storeId: string;
  name: string;
}

export interface StockData {
  stockId: string;
  storeId: string;
  productId: string;
  quantity: number;
  product: Product;
  store: { name: string };
}

export interface JournalData {
  stockJournalId: string;
  quantityChange: number;
  type: string;
  createdAt: string;
  stock: { product: Product };
}

export interface UpdateStockPayload {
  productId: string;
  storeId: string; // Updated to be required since the backend explicitly validates it
  quantityChange: number;
  type: "MANUAL_ADD" | "MANUAL_DEDUCT";
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface StoreQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

// --- HOOKS ---

// Hook: Fetch store locations with pagination and search
export function useGetStoresPaginated(
  params?: StoreQueryParams,
  enabled?: boolean,
) {
  return useQuery({
    queryKey: ["stores-catalog", params],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/stores`,
        { params: params || {} },
      );
      return data;
    },
    enabled: enabled,
  });
}

// Hook: Fetch stocks with optional store filter
export function useGetStocks(storeId?: string) {
  return useQuery({
    queryKey: ["stocks", storeId],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/inventory`,
        { params: storeId ? { storeId } : {} },
      );
      return data.data as StockData[];
    },
  });
}

// Hook: Fetch single stock record details by ID
export function useGetStockById(stockId: string) {
  return useQuery({
    queryKey: ["stock", stockId],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/inventory/${stockId}`,
      );
      return data.data as StockData;
    },
    enabled: !!stockId,
  });
}

// Hook: Fetch stock change log journals
export function useGetStockJournals(storeId?: string) {
  return useQuery({
    queryKey: ["stock-journals", storeId],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/inventory/journals`,
        { params: storeId ? { storeId } : {} },
      );
      return data.data as JournalData[];
    },
  });
}

// Hook: Mutate stock levels (In / Out)
export function useUpdateStock(storeId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateStockPayload) => {
      const { data } = await api.post(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/inventory/update`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stocks", storeId] });
      queryClient.invalidateQueries({ queryKey: ["stock-journals", storeId] });
    },
  });
}

// Hook: Fetch products catalog with queries
export function useGetProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: ["products-selector", params],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/products`,
        { params: params || {} },
      );
      return data;
    },
  });
}
