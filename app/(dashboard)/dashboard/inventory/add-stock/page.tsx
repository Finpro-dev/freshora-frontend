"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useUpdateStock,
  useGetStoresPaginated,
  useGetProducts,
} from "../_hooks/use-stock";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider"; // Tambah import
import {
  Loader2,
  ArrowLeft,
  PlusCircle,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Store,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function AddStockPage() {
  const router = useRouter();

  // PERBAIKAN: Gunakan auth store yang sebenarnya
  const role = useAuthStore((state) => state.role);
  const storeId = useAuthStore((state) => state.storeId);

  // Cek apakah user adalah SUPER_ADMIN
  const isSuperAdmin = role === "SUPER_ADMIN";

  // --- FORM STATES ---
  const [selectedStore, setSelectedStore] = useState<any | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [initialQty, setInitialQty] = useState<number>(0);

  // --- STORE MODAL & FILTER STATES (hanya untuk SUPER_ADMIN) ---
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [storeSearch, setStoreSearch] = useState("");
  const [storePage, setStorePage] = useState(1);

  // --- PRODUCT MODAL & FILTER STATES ---
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productPage, setProductPage] = useState(1);

  // --- FETCH DATA HOOKS ---
  // PERBAIKAN: Endpoint ini hanya dipanggil untuk SUPER_ADMIN
  const { data: storeResponse, isLoading: isLoadingStores } =
    useGetStoresPaginated(
      { page: storePage, limit: 5, search: storeSearch },
      isSuperAdmin, // Hanya SUPER_ADMIN yang bisa fetch store list
    );

  // PERBAIKAN: Untuk STORE_ADMIN, gunakan endpoint /admin/inventory untuk produk di toko mereka
  // Untuk SUPER_ADMIN, gunakan /products untuk semua produk
  const { data: productResponse, isLoading: isLoadingProducts } =
    useGetProducts({
      page: productPage,
      limit: 5,
      search: productSearch,
      category: categoryFilter === "all" ? undefined : categoryFilter,
    });

  const createStockMutation = useUpdateStock();

  const storeList = storeResponse?.data?.stores || storeResponse?.data || [];
  const totalStorePages =
    storeResponse?.data?.totalPage || storeResponse?.totalPage || 1;

  const products = productResponse?.data || [];
  const productPagination = productResponse?.pagination;
  const totalProductPages =
    productPagination?.totalPages || productResponse?.totalPages || 1;

  const categories = (productResponse?.categories || []).map((cat: any) => ({
    id: cat.productCategoryId as string,
    name: cat.category as string,
  }));

  // PERBAIKAN: Target store ID berdasarkan role
  const targetStoreId = isSuperAdmin
    ? selectedStore?.storeId || selectedStore?.id || ""
    : storeId || ""; // STORE_ADMIN gunakan storeId dari auth

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // PERBAIKAN: Validasi lebih ketat
    if (isSuperAdmin && !selectedStore) {
      return toast.error("Please select a target store location");
    }
    if (!targetStoreId) {
      return toast.error("Store ID not available");
    }
    if (!selectedProduct) {
      return toast.error("Please select a product from the catalog");
    }
    if (initialQty <= 0) {
      return toast.error("Initial quantity must be greater than zero");
    }

    try {
      await createStockMutation.mutateAsync({
        productId: selectedProduct.productId,
        storeId: targetStoreId,
        quantityChange: initialQty,
        type: "MANUAL_ADD",
      });

      toast.success("New stock successfully initialized");
      router.push("/dashboard/inventory");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to initialize stock entry",
      );
    }
  };

  // PERBAIKAN: Validasi apakah STORE_ADMIN memiliki storeId
  if (role === "STORE_ADMIN" && !storeId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-mist-50/50">
        <div className="flex flex-col items-center gap-3 max-w-sm text-center">
          <Store className="w-12 h-12 text-red-500" />
          <h2 className="text-lg font-bold text-brand-mist-800">
            Store Assignment Required
          </h2>
          <p className="text-sm text-brand-mist-500">
            Your account is not yet assigned to any store. Please contact
            SUPER_ADMIN to assign your store location.
          </p>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-4 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-brand-emerald-800 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => router.push("/dashboard/inventory")}
          className="group flex items-center gap-2 text-sm text-brand-mist-500 hover:text-brand-emerald-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Inventory
        </button>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-brand-mist-800">
            Initialize New Stock
          </h1>
          <p className="text-sm text-brand-mist-500">
            Register a product into a specific store inventory.
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="bg-white border border-brand-mist-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
        >
          {/* STORE SELECTION - HANYA UNTUK SUPER_ADMIN */}
          {isSuperAdmin ? (
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
                        ID: {selectedStore.storeId || selectedStore.id}
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
            </div>
          ) : (
            // PERBAIKAN: Tampilan untuk STORE_ADMIN - locked to their store
            <div className="bg-brand-mist-50 rounded-xl p-4 border border-brand-mist-100">
              <label className="text-[11px] uppercase tracking-wider font-bold text-brand-mist-400 block mb-1">
                Authorized Location
              </label>
              <p className="text-sm font-semibold text-brand-mist-700">
                Locked to Your Store: {storeId}
              </p>
            </div>
          )}

          {/* PRODUCT SELECTION - SAMA UNTUK SEMUA ROLE */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-mist-800">
              Select Product
            </label>
            {selectedProduct ? (
              <div className="p-4 border border-brand-emerald-500 bg-brand-emerald-50/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-mist-100 flex items-center justify-center overflow-hidden border border-brand-mist-200">
                    {selectedProduct.productPhotos?.[0]?.photoUrl ? (
                      <img
                        src={selectedProduct.productPhotos[0].photoUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-brand-mist-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-mist-800">
                      {selectedProduct.name}
                    </p>
                    <p className="text-xs text-brand-mist-400">
                      SN: {selectedProduct.serialNumber || "N/A"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(true)}
                  className="text-xs font-bold text-brand-emerald-700 underline"
                >
                  Change Product
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsProductModalOpen(true)}
                className="w-full border border-dashed border-brand-mist-300 hover:border-brand-emerald-500 rounded-xl p-5 text-center text-sm font-medium text-brand-mist-500 transition-colors"
              >
                + Click to Browse Products
              </button>
            )}
          </div>

          {/* QUANTITY */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-mist-800">
              Initial Stock Quantity
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                required
                className="w-full rounded-xl border border-brand-mist-300 p-3 pr-16 text-sm focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 outline-none"
                placeholder="0"
                value={initialQty || ""}
                onChange={(e) =>
                  setInitialQty(Math.max(0, parseInt(e.target.value) || 0))
                }
              />
              <span className="absolute right-4 top-3 text-brand-mist-400 text-sm font-medium">
                Units
              </span>
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="flex justify-end gap-3 pt-6 border-t border-brand-mist-100">
            <button
              type="button"
              onClick={() => router.push("/dashboard/inventory")}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-brand-mist-500 hover:bg-brand-mist-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createStockMutation.isPending}
              className="px-8 py-2.5 bg-brand-emerald-700 text-white rounded-xl text-sm font-bold hover:bg-brand-emerald-800 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg transition"
            >
              {createStockMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" /> Initialize Stock
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* STORES MODAL - HANYA UNTUK SUPER_ADMIN */}
      {isSuperAdmin && isStoreModalOpen && (
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
                  <Loader2 className="w-6 h-6 animate-spin text-brand-emerald-700" />
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
                                setSelectedStore(store);
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
            {/* STORE MODAL PAGINATION CONTROLS */}
            <div className="p-4 border-t border-brand-mist-100 bg-brand-mist-50 flex items-center justify-between text-xs">
              <span className="text-brand-mist-500">
                Page <strong>{storePage}</strong> of{" "}
                <strong>{totalStorePages}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={storePage === 1}
                  onClick={() => setStorePage((prev) => Math.max(prev - 1, 1))}
                  className="p-1.5 rounded-lg border border-brand-mist-300 bg-white hover:bg-brand-mist-50 disabled:opacity-50 text-brand-mist-600 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={storePage >= totalStorePages}
                  onClick={() =>
                    setStorePage((prev) => Math.min(prev + 1, totalStorePages))
                  }
                  className="p-1.5 rounded-lg border border-brand-mist-300 bg-white hover:bg-brand-mist-50 disabled:opacity-50 text-brand-mist-600 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS MODAL - SAMA UNTUK SEMUA ROLE */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-brand-mist-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-brand-mist-100 flex items-center justify-between bg-brand-mist-50">
              <h2 className="text-md font-bold text-brand-mist-800">
                Browse Product Catalog
              </h2>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 hover:bg-brand-mist-200 rounded-lg text-brand-mist-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 border-b border-brand-mist-100 bg-white grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Search by product name..."
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setProductPage(1);
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-brand-mist-300 bg-white outline-none"
              />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setProductPage(1);
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-brand-mist-300 bg-white outline-none text-brand-mist-700"
              >
                <option value="all">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {isLoadingProducts ? (
                <div className="h-48 flex flex-col items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-emerald-700" />
                </div>
              ) : (
                <div className="border border-brand-mist-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left bg-white">
                    <thead>
                      <tr className="bg-brand-mist-50 border-b border-brand-mist-200 text-brand-mist-500 uppercase font-bold">
                        <th className="p-3">Product Info</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-mist-100 text-brand-mist-700">
                      {products.map((product: any) => (
                        <tr key={product.productId}>
                          <td className="p-3">
                            <p className="font-semibold">{product.name}</p>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsProductModalOpen(false);
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
            {/* PRODUCT MODAL PAGINATION CONTROLS */}
            <div className="p-4 border-t border-brand-mist-100 bg-brand-mist-50 flex items-center justify-between text-xs">
              <span className="text-brand-mist-500">
                Page <strong>{productPage}</strong> of{" "}
                <strong>{totalProductPages}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={productPage === 1}
                  onClick={() =>
                    setProductPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="p-1.5 rounded-lg border border-brand-mist-300 bg-white hover:bg-brand-mist-50 disabled:opacity-50 text-brand-mist-600 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={productPage >= totalProductPages}
                  onClick={() =>
                    setProductPage((prev) =>
                      Math.min(prev + 1, totalProductPages),
                    )
                  }
                  className="p-1.5 rounded-lg border border-brand-mist-300 bg-white hover:bg-brand-mist-50 disabled:opacity-50 text-brand-mist-600 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
