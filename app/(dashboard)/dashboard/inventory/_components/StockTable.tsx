"use client";

import { useState } from "react";
import {
  Loader2,
  AlertCircle,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetStocks, StockData } from "../_hooks/use-stock";
import { StoreData } from "../_hooks/use-stock";
import { useRouter } from "next/navigation";

interface StockTableProps {
  selectedStore: StoreData | null;
}

export default function StockTable({ selectedStore }: StockTableProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const storeId = selectedStore?.storeId || selectedStore?.id || "";

  const {
    data: response,
    isLoading,
    isError,
  } = useGetStocks({
    storeId,
    page,
    limit,
  });

  const stocks = response?.data || [];
  const pagination = response?.pagination || {};
  const totalPages = pagination.totalPages || 1;

  return (
    <div className="bg-brand-mist-100/10 rounded-2xl border border-brand-mist-200 shadow-sm overflow-hidden">
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
          <p className="text-sm font-medium text-brand-mist-500">
            Loading inventory...
          </p>
        </div>
      ) : isError ? (
        <div className="h-64 flex flex-col items-center justify-center gap-2 text-center p-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm font-bold text-brand-mist-800">
            Data Synchronization Failed
          </p>
          <p className="text-xs text-brand-mist-400">
            Please verify secure network handshakes or data gateway status.
          </p>
        </div>
      ) : (
        <>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-mist-50/70 border-b border-brand-mist-200 text-xs font-bold text-brand-mist-500 uppercase tracking-wider">
                <th className="p-4">SKU / Product Name</th>
                <th className="p-4">Store Location</th>
                <th className="p-4 text-right">Available Qty</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-brand-mist-100 text-brand-mist-700">
              {stocks.length > 0 ? (
                stocks.map((stock: StockData) => (
                  <tr
                    key={stock.stockId}
                    className="hover:bg-brand-mist-50/40 transition-colors"
                  >
                    <td className="p-4 font-medium text-brand-mist-900">
                      <div className="flex items-center gap-2.5">
                        <Package className="w-4 h-4 text-brand-emerald-600" />
                        <div>
                          <p className="font-bold text-brand-mist-800">
                            {stock.product.name}
                          </p>
                          <p className="text-xs text-brand-mist-400 font-mono mt-0.5">
                            SN: {stock.product.serialNumber}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-brand-mist-700">
                      {stock.store?.name || "Unknown Distributed Facility"}
                    </td>
                    <td className="p-4 text-right font-bold text-brand-mist-900">
                      <span
                        className={
                          stock.quantity === 0
                            ? "text-red-600"
                            : "text-brand-mist-900"
                        }
                      >
                        {stock.quantity} Units
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/inventory/${stock.stockId}`)
                        }
                        className="text-xs font-bold text-brand-emerald-700 hover:text-white hover:bg-brand-emerald-700 bg-brand-emerald-50 px-3 py-2 rounded-xl transition-all"
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-12 text-center text-sm text-brand-mist-400 font-medium"
                  >
                    No active inventory levels recorded matching current
                    facility parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-brand-mist-100 bg-brand-mist-50 flex items-center justify-between text-xs font-semibold text-brand-mist-500">
              <span>
                Page {page} of {totalPages} • Total: {pagination.total} items
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="p-1.5 border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 text-brand-mist-700 hover:bg-brand-mist-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="p-1.5 border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 text-brand-mist-700 hover:bg-brand-mist-100 transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
