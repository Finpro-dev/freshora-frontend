"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Store, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetStoresPaginated, StoreData } from "../_hooks/use-stock";

interface StoreFilterProps {
  userRole: "SUPER_ADMIN" | "STORE_ADMIN";
  selectedStore: StoreData | null;
  onSelectStore: (store: StoreData | null) => void;
}

export default function StoreFilter({
  userRole,
  selectedStore,
  onSelectStore,
}: StoreFilterProps) {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [storeSearch, setStoreSearch] = useState("");
  const [storePage, setStorePage] = useState(1);

  const { data: storeResponse, isLoading: isStoresLoading } =
    useGetStoresPaginated(
      { page: storePage, limit: 5, search: storeSearch },
      userRole === "SUPER_ADMIN",
    );

  const storeList = storeResponse?.data?.stores || storeResponse?.data || [];
  const totalStorePages = storeResponse?.data?.totalPage || 1;

  if (userRole !== "SUPER_ADMIN") return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="bg-brand-mist-100 px-4 py-2.5 rounded-xl border border-brand-mist-300 flex items-center gap-3 shadow-sm min-w-[260px] max-w-xs h-[44px]">
        <Store className="w-4 h-4 text-brand-mist-500 shrink-0" />
        <span className="text-sm text-brand-mist-800 font-semibold truncate flex-1">
          {selectedStore ? selectedStore.name : "All Store Locations"}
        </span>

        {selectedStore && (
          <button
            type="button"
            onClick={() => {
              onSelectStore(null);
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
        className="px-5 py-2.5 bg-brand-mist-100 border border-brand-mist-300 text-brand-mist-700 hover:bg-brand-mist-200 text-sm font-bold rounded-xl transition-all h-[44px]"
      >
        Browse & Filter Store
      </button>

      {/* --- MODAL --- */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-brand-mist-100 rounded-2xl max-w-xl w-full flex flex-col max-h-[80vh] shadow-2xl border border-brand-mist-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-brand-mist-200 flex justify-between items-center bg-brand-mist-50">
              <div>
                <h2 className="font-bold text-brand-mist-800 text-md flex items-center gap-2">
                  Browse Store
                </h2>
                <p className="text-xs text-brand-mist-500">
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

            {/* Search Input */}
            <div className="p-4 border-b border-brand-mist-200 bg-brand-mist-100">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-brand-mist-500 absolute left-3" />
                <input
                  type="text"
                  placeholder="Filter store location name..."
                  value={storeSearch}
                  onChange={(e) => {
                    setStoreSearch(e.target.value);
                    setStorePage(1);
                  }}
                  className="input w-full pl-9 pr-4 py-2.5 border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-xs"
                />
              </div>
            </div>

            {/* Store List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-brand-mist-100">
              {isStoresLoading ? (
                <div className="h-48 flex flex-col items-center justify-center gap-2">
                  <span className="text-xs text-brand-mist-500">
                    Analyzing organization master ledgers...
                  </span>
                </div>
              ) : storeList.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-center text-sm text-brand-mist-500">
                  No active store footprints registered under criteria.
                </div>
              ) : (
                <div className="border border-brand-mist-200 rounded-xl overflow-hidden text-xs shadow-sm">
                  <table className="w-full border-collapse text-left bg-brand-mist-100">
                    <thead>
                      <tr className="bg-brand-mist-50 font-bold border-b border-brand-mist-200 text-brand-mist-600 uppercase tracking-wider">
                        <th className="p-3">Distribution Facility Name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-mist-200 text-brand-mist-700">
                      {storeList.map((store: any) => (
                        <tr
                          key={store.storeId || store.id}
                          className="hover:bg-brand-mist-200/50 transition-colors"
                        >
                          <td className="p-3">
                            <p className="font-semibold text-brand-mist-800">
                              {store.name}
                            </p>
                            <p className="text-[10px] text-brand-mist-500 font-mono mt-0.5">
                              UUID: {store.storeId || store.id}
                            </p>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                onSelectStore(store);
                                setIsStoreModalOpen(false);
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

            {/* Pagination */}
            {storeResponse && totalStorePages > 1 && (
              <div className="p-3 border-t border-brand-mist-200 bg-brand-mist-50 flex items-center justify-between text-xs font-semibold text-brand-mist-600">
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
                    className="p-1.5 bg-brand-mist-100 border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 text-brand-mist-700 hover:bg-brand-mist-200 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    type="button"
                    disabled={storePage >= totalStorePages}
                    onClick={() => setStorePage((prev) => prev + 1)}
                    className="p-1.5 bg-brand-mist-100 border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 text-brand-mist-700 hover:bg-brand-mist-200 transition-colors"
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
