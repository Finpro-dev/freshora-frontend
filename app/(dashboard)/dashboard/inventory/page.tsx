"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetStocks, useGetStoresPaginated } from "./_hooks/use-stock";
import {
  Plus,
  Loader2,
  Store,
  X,
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Package,
  History, // 👈 Menambahkan icon History untuk Jurnal
} from "lucide-react";
import { toast } from "sonner";

export default function StockOverviewPage() {
  const router = useRouter();

  // Active user session simulation
  const user = {
    role: "SUPER_ADMIN" as "SUPER_ADMIN" | "STORE_ADMIN",
    storeId: "",
  };

  // --- MODAL & FILTER STATES ---
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [storeSearch, setStoreSearch] = useState("");
  const [storePage, setStorePage] = useState(1);
  const [selectedStore, setSelectedStore] = useState<any | null>(null);

  // 1. Fetch live stock ledger entries based on store filter selection
  const {
    data: stocks,
    isLoading,
    isError,
  } = useGetStocks(selectedStore?.storeId || selectedStore?.id || "");

  // 2. Fetch paginated store records for the global selection pop-up modal
  const { data: storeResponse, isLoading: isStoresLoading } =
    useGetStoresPaginated(
      { page: storePage, limit: 5, search: storeSearch },
      user.role === "SUPER_ADMIN",
    );

  // Master data extraction mapping
  const storeList = storeResponse?.data?.stores || storeResponse?.data || [];
  const totalStorePages = storeResponse?.data?.totalPage || 1;

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8 space-y-6 relative">
      {/* Top Ledger Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-mist-200 pb-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-brand-mist-800">
            Inventory Stock Ledger
          </h1>
          <p className="text-sm text-brand-mist-500">
            Real-time unit levels and master catalog distribution control grid.
          </p>
        </div>

        {/* Action Buttons Container */}
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          {/* 1. BUTTON KE STOCK JOURNAL */}
          <button
            onClick={() => router.push("/dashboard/inventory/journals")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-brand-mist-300 text-brand-mist-700 hover:bg-brand-mist-50 text-sm font-bold rounded-xl shadow-sm transition-all group flex-1 sm:flex-initial"
          >
            <History className="w-4 h-4 text-brand-mist-500 group-hover:rotate-[-15deg] transition-transform" />
            Stock Journals
          </button>

          {/* 2. BUTTON INITIALIZE NEW STOCK */}
          <button
            onClick={() => router.push("/dashboard/inventory/add-stock")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-emerald-700 text-white text-sm font-bold rounded-xl hover:bg-brand-emerald-800 shadow-md transition-all group flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Initialize New Stock
          </button>
        </div>
      </div>

      {/* --- PREMIUM FILTER PANEL CONTROL --- */}
      {user.role === "SUPER_ADMIN" && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white px-4 py-2.5 rounded-xl border border-brand-mist-300 flex items-center gap-3 shadow-inner min-w-[260px] max-w-xs h-[44px]">
            <Store className="w-4 h-4 text-brand-mist-400 shrink-0" />
            <span className="text-sm text-brand-mist-800 font-semibold truncate flex-1">
              {selectedStore ? selectedStore.name : "All Store Locations"}
            </span>

            {/* Clear Filter Micro-interaction */}
            {selectedStore && (
              <button
                type="button"
                onClick={() => {
                  setSelectedStore(null);
                  toast.success(
                    "Filter cleared. Displaying all warehouse grids.",
                  );
                }}
                className="text-brand-mist-400 hover:text-brand-mist-600 p-0.5 rounded-md hover:bg-brand-mist-100 transition"
                title="Clear Filter Location"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsStoreModalOpen(true)}
            className="px-5 py-2.5 bg-brand-mist-800 text-white hover:bg-brand-mist-900 text-sm font-bold rounded-xl shadow-lg transition-all h-[44px]"
          >
            Browse & Filter Store
          </button>
        </div>
      )}

      {/* Data Presentation Table View Grid */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-brand-mist-200 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
          <p className="text-sm font-medium text-brand-mist-500">
            Syncing corporate inventory balance sheets...
          </p>
        </div>
      ) : isError ? (
        <div className="h-64 flex flex-col items-center justify-center gap-2 bg-white rounded-2xl border border-brand-mist-200 shadow-sm text-center p-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm font-bold text-brand-mist-800">
            Data Synchronization Failed
          </p>
          <p className="text-xs text-brand-mist-400">
            Please verify secure network handshakes or data gateway status.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-mist-200 shadow-sm overflow-hidden">
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
              {stocks && stocks.length > 0 ? (
                stocks.map((stock) => (
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
        </div>
      )}

      {/* --- POP-UP MODAL SELECTION (MATCHES ADD-STOCK THEME) --- */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full flex flex-col max-h-[80vh] shadow-2xl border border-brand-mist-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-brand-mist-100 flex justify-between items-center bg-brand-mist-50">
              <div>
                <h2 className="font-bold text-brand-mist-800 text-md flex items-center gap-2">
                  Browse Store
                </h2>
                <p className="text-xs text-brand-mist-400">
                  Search and map distributed enterprise retail store units.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsStoreModalOpen(false)}
                className="text-brand-mist-500 hover:bg-brand-mist-200 p-1.5 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Filter Input Panel */}
            <div className="p-4 border-b border-brand-mist-100 bg-white">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-brand-mist-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Filter store location name..."
                  value={storeSearch}
                  onChange={(e) => {
                    setStoreSearch(e.target.value);
                    setStorePage(1);
                  }}
                  className="w-full pl-9 pr-4 py-2.5 border border-brand-mist-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800"
                />
              </div>
            </div>

            {/* Modal Dynamic Records Content Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
              {isStoresLoading ? (
                <div className="h-48 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-emerald-700" />
                  <p className="text-xs text-brand-mist-400">
                    Analyzing organization master ledgers...
                  </p>
                </div>
              ) : storeList.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-center text-sm text-brand-mist-400">
                  No active store footprints registered under criteria.
                </div>
              ) : (
                <div className="border border-brand-mist-200 rounded-xl overflow-hidden text-xs shadow-sm">
                  <table className="w-full border-collapse text-left bg-white">
                    <thead>
                      <tr className="bg-brand-mist-50 font-bold border-b border-brand-mist-200 text-brand-mist-500 uppercase tracking-wider">
                        <th className="p-3">Distribution Facility Name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-mist-100 text-brand-mist-700">
                      {storeList.map((store: any) => (
                        <tr
                          key={store.storeId || store.id}
                          className="hover:bg-brand-mist-50/50 transition-colors"
                        >
                          <td className="p-3">
                            <p className="font-semibold text-brand-mist-900">
                              {store.name}
                            </p>
                            <p className="text-[10px] text-brand-mist-400 font-mono mt-0.5">
                              UUID: {store.storeId || store.id}
                            </p>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedStore(store);
                                setIsStoreModalOpen(false);
                                toast.success(
                                  `Active view filter updated to: ${store.name}`,
                                );
                              }}
                              className="px-3 py-1.5 bg-brand-emerald-50 hover:bg-brand-emerald-700 text-brand-emerald-700 hover:text-white font-bold rounded-lg transition-all"
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Dynamic Pagination Interface Sync */}
            {storeResponse && totalStorePages > 1 && (
              <div className="p-3 border-t border-brand-mist-100 bg-brand-mist-50 flex items-center justify-between text-xs font-semibold text-brand-mist-500">
                <span>
                  Page {storePage} of {totalStorePages}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    disabled={storePage === 1}
                    onClick={() =>
                      setStorePage((prev) => Math.max(1, prev - 1))
                    }
                    className="p-1.5 bg-white border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 shadow-sm text-brand-mist-700"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    type="button"
                    disabled={storePage >= totalStorePages}
                    onClick={() => setStorePage((prev) => prev + 1)}
                    className="p-1.5 bg-white border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 shadow-sm text-brand-mist-700"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
