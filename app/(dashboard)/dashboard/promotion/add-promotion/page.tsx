"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import {
  useCreateDiscount,
  useGetProducts,
  useGetStoreStocks,
  DiscountType,
  DiscountValueType,
} from "../_hooks/use-discount";
import {
  Loader2,
  ArrowLeft,
  PlusCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateDiscountPage() {
  const router = useRouter();

  const role = useAuthStore((state) => state.role);
  const storeId = useAuthStore((state) => state.storeId);

  const isGlobal = role === "SUPER_ADMIN";
  const currentStoreId = storeId;

  const [formData, setFormData] = useState({
    type: "NO_REQUIREMENT" as DiscountType,
    valueType: "PERCENTAGE" as DiscountValueType,
    discountAmount: "",
    minTransaction: "",
    maxDiscount: "",
    validFrom: "",
    validUntil: "",
  });
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productPage, setProductPage] = useState(1);

  const { data: globalProductResponse, isLoading: isLoadingGlobal } =
    useGetProducts({
      page: productPage,
      limit: 5,
      search: productSearch,
      category: categoryFilter === "all" ? undefined : categoryFilter,
      enabled: isGlobal,
    });

  const { data: stockResponse, isLoading: isLoadingStocks } = useGetStoreStocks(
    {
      storeId: currentStoreId || undefined,
      page: productPage,
      limit: 5,
      search: productSearch,
      enabled: !isGlobal && !!currentStoreId,
    },
  );

  const createDiscountMutation = useCreateDiscount();

  // Guard Clause untuk memverifikasi kecocokan hak akses role
  if (role === "STORE_ADMIN" && !currentStoreId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-mist-50/50">
        <div className="flex flex-col items-center gap-3 max-w-sm text-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-lg font-bold text-brand-mist-800">
            Access Denied
          </h2>
          <p className="text-sm text-brand-mist-500">
            Your account is not associated with any store. Please contact
            SUPER_ADMIN to assign your store.
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

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-mist-50/50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
          <p className="text-xs text-brand-mist-500 font-medium">
            Loading session...
          </p>
        </div>
      </div>
    );
  }

  const isLoadingProducts = isGlobal ? isLoadingGlobal : isLoadingStocks;

  const productItems = isGlobal
    ? globalProductResponse?.data || []
    : (stockResponse?.data || stockResponse || []).map((item: any) => {
        const productDetails = item?.product || item?.Product;
        if (productDetails) {
          return {
            ...productDetails,
            stockId: item.id || item.stockId,
            currentStock: item.quantity || item.stock,
          };
        }
        return item;
      });

  const totalProductPages = isGlobal
    ? globalProductResponse?.meta?.totalPages ||
      globalProductResponse?.pagination?.totalPages ||
      globalProductResponse?.totalPages ||
      1
    : stockResponse?.meta?.totalPages ||
      stockResponse?.pagination?.totalPages ||
      stockResponse?.totalPages ||
      1;

  const categories = (globalProductResponse?.categories || []).map(
    (cat: any) => ({
      id: cat.productCategoryId as string,
      name: cat.category as string,
    }),
  );

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as DiscountType;
    if (selectedType === "BUY_ONE_GET_ONE") {
      setFormData((prev) => ({
        ...prev,
        type: selectedType,
        valueType: "PERCENTAGE",
        discountAmount: "100",
        minTransaction: "",
        maxDiscount: "",
      }));
    } else if (selectedType === "MIN_TRANSACTION") {
      setFormData((prev) => ({ ...prev, type: selectedType }));
      setSelectedProduct(null);
    } else {
      setFormData((prev) => ({ ...prev, type: selectedType }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      type: formData.type,
      valueType: formData.valueType,
      discountAmount: Number(formData.discountAmount),
      productId:
        formData.type === "MIN_TRANSACTION"
          ? null
          : selectedProduct?.productId || selectedProduct?.id || null,
      storeId: isGlobal ? null : storeId || null,
      minTransaction: formData.minTransaction
        ? Number(formData.minTransaction)
        : null,
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
      validFrom: new Date(formData.validFrom).toISOString(),
      validUntil: new Date(formData.validUntil).toISOString(),
    };

    try {
      await createDiscountMutation.mutateAsync(payload);
      toast.success("Promotion initialized successfully.");
      router.push("/dashboard/promotion");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to initialize discount rule.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => router.push("/dashboard/promotion")}
          className="group flex items-center gap-2 text-sm text-brand-mist-500 hover:text-brand-emerald-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Promotions
        </button>

        <h1 className="text-2xl font-bold text-brand-mist-800">
          Create New Promotion
          <span className="text-xs ml-2 px-2.5 py-1 rounded-full bg-brand-mist-100 text-brand-mist-600 font-normal">
            {isGlobal ? "Global Mode" : "Store Mode"}
          </span>
        </h1>

        <form
          onSubmit={handleFormSubmit}
          className="bg-white border border-brand-mist-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-mist-800">
              Promotion Type
            </label>
            <select
              value={formData.type}
              onChange={handleTypeChange}
              className="w-full bg-white border border-brand-mist-300 rounded-xl px-3 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-brand-emerald-500 text-brand-mist-800"
            >
              <option value="NO_REQUIREMENT">No Requirement</option>
              <option value="MIN_TRANSACTION">Minimum Transaction</option>
              <option value="BUY_ONE_GET_ONE">
                Buy One Get One Free (BOGO)
              </option>
            </select>
          </div>

          {formData.type !== "MIN_TRANSACTION" && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-mist-800">
                Target Product
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
                      <p className="text-xs text-brand-mist-400 font-mono">
                        ID: {selectedProduct.productId || selectedProduct.id}
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
          )}

          {formData.type !== "BUY_ONE_GET_ONE" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-mist-800">
                  Value Type
                </label>
                <select
                  value={formData.valueType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      valueType: e.target.value as DiscountValueType,
                    }))
                  }
                  className="w-full bg-white border border-brand-mist-300 rounded-xl px-3 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-brand-emerald-500 text-brand-mist-800"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="NOMINAL">Nominal (Rp)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-mist-800">
                  Amount
                </label>
                <input
                  type="number"
                  required
                  placeholder={
                    formData.valueType === "PERCENTAGE"
                      ? "e.g., 25"
                      : "e.g., 15000"
                  }
                  value={formData.discountAmount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      discountAmount: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-brand-mist-300 p-3 text-sm focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 outline-none"
                />
              </div>
            </div>
          )}

          {formData.type === "MIN_TRANSACTION" && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-mist-800">
                Minimum Purchase Value
              </label>
              <input
                type="number"
                required
                placeholder="e.g., 75000"
                value={formData.minTransaction}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    minTransaction: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-brand-mist-300 p-3 text-sm focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 outline-none"
              />
            </div>
          )}

          {formData.valueType === "PERCENTAGE" &&
            formData.type !== "BUY_ONE_GET_ONE" && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-mist-800">
                  Max Discount (Optional)
                </label>
                <input
                  type="number"
                  placeholder="Leave blank for no limit"
                  value={formData.maxDiscount}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxDiscount: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-brand-mist-300 p-3 text-sm focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 outline-none"
                />
              </div>
            )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-mist-800">
                Valid From
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-brand-mist-400 absolute left-3 top-3.5 pointer-events-none" />
                <input
                  type="datetime-local"
                  required
                  value={formData.validFrom}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      validFrom: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-brand-mist-300 p-3 pl-10 text-sm focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-mist-800">
                Valid Until
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-brand-mist-400 absolute left-3 top-3.5 pointer-events-none" />
                <input
                  type="datetime-local"
                  required
                  value={formData.validUntil}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      validUntil: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-brand-mist-300 p-3 pl-10 text-sm focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-brand-mist-100">
            <button
              type="button"
              onClick={() => router.push("/dashboard/promotion")}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-brand-mist-500 hover:bg-brand-mist-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createDiscountMutation.isPending}
              className="px-8 py-2.5 bg-brand-emerald-700 text-white rounded-xl text-sm font-bold hover:bg-brand-emerald-800 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg transition"
            >
              {createDiscountMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" /> Create Promotion
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* PRODUCT SELECTION MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-brand-mist-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-brand-mist-100 flex items-center justify-between bg-brand-mist-50">
              <h2 className="text-md font-bold text-brand-mist-800">
                {isGlobal ? "Global Product Catalog" : "Store Inventory Stocks"}
              </h2>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 hover:bg-brand-mist-200 rounded-lg text-brand-mist-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b border-brand-mist-100 bg-white flex gap-3">
              <input
                type="text"
                placeholder={
                  isGlobal
                    ? "Search by product name..."
                    : "Search product in store inventory..."
                }
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setProductPage(1);
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-brand-mist-300 bg-white outline-none"
              />
              {isGlobal && categories.length > 0 && (
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setProductPage(1);
                  }}
                  className="text-xs p-2.5 rounded-xl border border-brand-mist-300 bg-white outline-none text-brand-mist-700"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
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
                        <th className="p-3">Product Name</th>
                        {!isGlobal && (
                          <th className="p-3 text-center">Available Stock</th>
                        )}
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-mist-100 text-brand-mist-700">
                      {productItems.length === 0 ? (
                        <tr>
                          <td
                            colSpan={isGlobal ? 2 : 3}
                            className="p-8 text-center text-brand-mist-400 font-medium"
                          >
                            No products found for this scope.
                          </td>
                        </tr>
                      ) : (
                        productItems.map((product: any) => (
                          <tr key={product.productId || product.id}>
                            <td className="p-3">
                              <p className="font-semibold">{product.name}</p>
                            </td>
                            {!isGlobal && (
                              <td className="p-3 text-center font-mono font-bold text-brand-mist-600">
                                {product.currentStock ?? 0} pcs
                              </td>
                            )}
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
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

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
