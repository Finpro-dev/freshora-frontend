"use client";

import { useState } from "react";
import { Store, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetStoresPaginated, StoreData } from "../../_hooks/use-stock";

interface StoreSectionProps {
  isSuperAdmin: boolean;
  selectedStore: StoreData | null;
  onSelectStore: (store: StoreData | null) => void;
  storeId?: string | null;
}

export default function StoreSection({
  isSuperAdmin,
  selectedStore,
  onSelectStore,
  storeId,
}: StoreSectionProps) {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [storeSearch, setStoreSearch] = useState("");
  const [storePage, setStorePage] = useState(1);

  const { data: storeResponse, isLoading: isLoadingStores } =
    useGetStoresPaginated(
      { page: storePage, limit: 5, search: storeSearch },
      isSuperAdmin,
    );

  const storeList = storeResponse?.data?.stores || storeResponse?.data || [];
  const totalStorePages =
    storeResponse?.data?.totalPage || storeResponse?.totalPage || 1;

  // STORE_ADMIN: tampilkan locked store
  if (!isSuperAdmin) {
    return (
      <div className="bg-brand-mist-50 rounded-xl p-4 border border-brand-mist-100">
        <label className="text-[11px] uppercase tracking-wider font-bold text-brand-mist-400 block mb-1">
          Authorized Location
        </label>
        <p className="text-sm font-semibold text-brand-mist-700">
          Locked to Your Store: {storeId}
        </p>
      </div>
    );
  }

  // SUPER_ADMIN: tampilkan modal selection
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-brand-mist-800">
        Target Distribution Store
      </label>
      {selectedStore ? (
        <div className="p-4 border border-brand-emerald-500 bg-brand-emerald-50/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="w-5 h-5 text-brand-emerald-700" />
            <div>
              <p className="text-sm font-bold text-brand-mist-800">
                {selectedStore.name}
              </p>
              <p className="text-xs text-brand-mist-400 font-mono">
                ID: {selectedStore.storeId}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsStoreModalOpen(true)}
            className="text-xs font-bold text-brand-emerald-700 underline"
          >
            Change Store
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsStoreModalOpen(true)}
          className="w-full border border-dashed border-brand-mist-300 hover:border-brand-emerald-500 rounded-xl p-5 text-center text-sm font-medium text-brand-mist-500 transition-colors"
        >
          + Click to Browse Store Locations
        </button>
      )}

      {/* MODAL */}
      {isStoreModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-brand-mist-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-brand-mist-100 flex items-center justify-between bg-brand-mist-50">
              <h2 className="text-md font-bold text-brand-mist-800">
                Browse Target Distribution Stores
              </h2>
              <button
                type="button"
                onClick={() => setIsStoreModalOpen(false)}
                className="p-1.5 hover:bg-brand-mist-200 rounded-lg text-brand-mist-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 border-b border-brand-mist-100 bg-white">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-brand-mist-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Search store by location name..."
                  value={storeSearch}
                  onChange={(e) => {
                    setStoreSearch(e.target.value);
                    setStorePage(1);
                  }}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-brand-mist-300 bg-white outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {isLoadingStores ? (
                <div className="h-48 flex flex-col items-center justify-center gap-2">
                  <span className="text-xs text-brand-mist-400">
                    Analyzing organization master ledgers...
                  </span>
                </div>
              ) : storeList.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-center text-sm text-brand-mist-400">
                  No active store footprints registered under criteria.
                </div>
              ) : (
                <div className="border border-brand-mist-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left bg-white">
                    <thead>
                      <tr className="bg-brand-mist-50 border-b border-brand-mist-200 text-brand-mist-500 uppercase font-bold">
                        <th className="p-3">Store Unit</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-mist-100 text-brand-mist-700">
                      {storeList.map((store: any) => (
                        <tr key={store.storeId || store.id}>
                          <td className="p-3">
                            <p className="font-semibold">{store.name}</p>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                onSelectStore(store);
                                setIsStoreModalOpen(false);
                              }}
                              className="px-3 py-1.5 bg-brand-emerald-50 text-brand-emerald-700 font-bold rounded-lg hover:bg-brand-emerald-700 hover:text-white transition"
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
            {/* PAGINATION */}
            {storeResponse && totalStorePages > 1 && (
              <div className="p-4 border-t border-brand-mist-100 bg-brand-mist-50 flex items-center justify-between text-xs">
                <span className="text-brand-mist-500">
                  Page <strong>{storePage}</strong> of{" "}
                  <strong>{totalStorePages}</strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={storePage === 1}
                    onClick={() =>
                      setStorePage((prev) => Math.max(prev - 1, 1))
                    }
                    className="p-1.5 rounded-lg border border-brand-mist-300 bg-white hover:bg-brand-mist-50 disabled:opacity-50 text-brand-mist-600 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={storePage >= totalStorePages}
                    onClick={() =>
                      setStorePage((prev) =>
                        Math.min(prev + 1, totalStorePages),
                      )
                    }
                    className="p-1.5 rounded-lg border border-brand-mist-300 bg-white hover:bg-brand-mist-50 disabled:opacity-50 text-brand-mist-600 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
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
