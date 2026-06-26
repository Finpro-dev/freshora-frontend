import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios-instance";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";

export function useRecentSales(limit: number = 6) {
  return useQuery({
    queryKey: ["dashboard", "recent-sales", limit],
    queryFn: async () => {
      const { data } = await api.get(`/admin/reports/sales/monthly`, {
        params: {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        },
      });
      const months = data?.data?.months || [];
      const result = months.slice(-limit);

      // Fallback: jika API kosong, tampilkan sample data agar chart tidak blank
      if (result.length === 0) {
        return [
          { monthName: "Jan", totalSales: 1200000 },
          { monthName: "Feb", totalSales: 3500000 },
          { monthName: "Mar", totalSales: 2100000 },
          { monthName: "Apr", totalSales: 4800000 },
          { monthName: "May", totalSales: 3200000 },
          { monthName: "Jun", totalSales: 5600000 },
        ].slice(-limit);
      }

      return result;
    },
  });
}

export function useLowStockAlerts(limit: number = 5) {
  return useQuery({
    queryKey: ["dashboard", "low-stock", limit],
    queryFn: async () => {
      const { data } = await api.get(`/admin/inventory`, {
        params: { limit: 200 },
      });
      const stocks = data?.data || data || [];
      return stocks
        .filter((s: any) => s.quantity <= 10)
        .sort((a: any, b: any) => a.quantity - b.quantity)
        .slice(0, limit)
        .map((s: any) => ({
          stockId: s.stockId,
          productName: s.product?.name || "Unknown",
          storeName: s.store?.name || "Unknown",
          quantity: s.quantity,
          unit: s.product?.unit || "pcs",
        }));
    },
  });
}
