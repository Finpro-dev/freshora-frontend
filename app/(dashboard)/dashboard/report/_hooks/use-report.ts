import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../../shared/lib/axios-instance";

export interface MonthlySalesData {
  month: number;
  monthName: string;
  totalSales: number;
  orderCount: number;
}

export interface SalesReportResponse {
  year: number;
  month: number | null;
  totalSales: number;
  months: MonthlySalesData[];
}

export interface SalesByCategory {
  categoryId: string;
  categoryName: string;
  totalSales: number;
  quantity: number;
}

export interface SalesByProduct {
  productId: string;
  productName: string;
  categoryName: string;
  totalSales: number;
  quantity: number;
}

export interface StockSummaryItem {
  productId: string;
  productName: string;
  storeId: string;
  storeName: string;
  totalAddition: number;
  totalDeduction: number;
  finalStock: number;
}

export interface StockDetailItem {
  stockJournalId: string;
  productId: string;
  productName: string;
  storeId: string;
  storeName: string;
  quantityChange: number;
  type: string;
  updatedBy: string | null;
  mutationId: string | null;
  transactionId: string | null;
  createdAt: string;
}

export interface StockDetailResponse {
  journals: StockDetailItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export interface Store {
  storeId: string;
  name: string;
}

interface UseReportParams {
  year: number;
  month?: number;
  storeId?: string | null;
  productId?: string;
  enabled?: boolean;
}

export function useMonthlySalesReport({ year, month, storeId, enabled = true }: UseReportParams) {
  return useQuery({
    queryKey: ["sales-report", "monthly", year, month, storeId],
    queryFn: async () => {
      const params = new URLSearchParams({ year: String(year) });
      if (month && month > 0) params.append("month", String(month));
      if (storeId) params.append("storeId", storeId);

      const { data } = await api.get(`/admin/reports/sales/monthly?${params}`);
      return data.data as SalesReportResponse;
    },
    enabled,
  });
}

export function useSalesByCategory({ year, month, storeId, enabled = true }: UseReportParams) {
  return useQuery({
    queryKey: ["sales-report", "by-category", year, month, storeId],
    queryFn: async () => {
      const params = new URLSearchParams({ year: String(year) });
      if (month && month > 0) params.append("month", String(month));
      if (storeId) params.append("storeId", storeId);

      const { data } = await api.get(`/admin/reports/sales/by-category?${params}`);
      return data.data as SalesByCategory[];
    },
    enabled,
  });
}

export function useSalesByProduct({ year, month, storeId, enabled = true }: UseReportParams) {
  return useQuery({
    queryKey: ["sales-report", "by-product", year, month, storeId],
    queryFn: async () => {
      const params = new URLSearchParams({ year: String(year) });
      if (month && month > 0) params.append("month", String(month));
      if (storeId) params.append("storeId", storeId);

      const { data } = await api.get(`/admin/reports/sales/by-product?${params}`);
      return data.data as SalesByProduct[];
    },
    enabled,
  });
}

export function useStockSummary({ year, month, storeId, enabled = true }: UseReportParams) {
  return useQuery({
    queryKey: ["stock-report", "summary", year, month, storeId],
    queryFn: async () => {
      const params = new URLSearchParams({ year: String(year) });
      if (month && month > 0) params.append("month", String(month));
      if (storeId) params.append("storeId", storeId);

      const { data } = await api.get(`/admin/reports/stock/summary?${params}`);
      return data.data as StockSummaryItem[];
    },
    enabled,
  });
}

export function useStores() {
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const { data } = await api.get("/stores");
      return data.data?.stores || [] as Store[];
    },
  });
}

export function useStockDetail({ year, month, storeId, productId, page = 1, limit = 20 }: UseReportParams & { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["stock-report", "detail", year, month, storeId, productId, page, limit],
    queryFn: async () => {
      const actualMonth = month || new Date().getMonth() + 1;
      const params = new URLSearchParams({ year: String(year), month: String(actualMonth), page: String(page), limit: String(limit) });
      if (storeId) params.append("storeId", storeId);
      if (productId) params.append("productId", productId);

      const { data } = await api.get(`/admin/reports/stock/detail?${params}`);
      return data.data as StockDetailResponse;
    },
  });
}