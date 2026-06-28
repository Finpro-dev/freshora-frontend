"use client";

import { useState } from "react";
import { useGetProducts, ProductQueryParams } from "../../_hooks/use-stock";
import {
  Image as ImageIcon,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";

interface ProductSelectorProps {
  selectedProduct: any;
  onSelectProduct: (product: any) => void;
}

export default function ProductSelector({
  selectedProduct,
  onSelectProduct,
}: ProductSelectorProps) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productPage, setProductPage] = useState(1);

  const role = useAuthStore((state) => state.role);
  const isSuperAdmin = role === "SUPER_ADMIN";

  const { data: productResponse, isLoading: isLoadingProducts } =
    useGetProducts({
      page: productPage,
      limit: 5,
      search: productSearch,
      category: categoryFilter === "all" ? undefined : categoryFilter,
    } as ProductQueryParams);

  const products = productResponse?.data || [];
  const productPagination = productResponse?.pagination;
  const totalProductPages =
    productPagination?.totalPages || productResponse?.totalPages || 1;

  const categories = (productResponse?.categories || []).map((cat: any) => ({
    id: cat.productCategoryId as string,
    name: cat.category as string,
  }));

  return (
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

      {/* PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-mist-100/10 rounded-2xl border border-brand-mist-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
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
            <div className="p-4 border-b border-brand-mist-100 bg-brand-mist-100/10 grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Search by product name..."
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setProductPage(1);
                }}
                className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-xs"
              />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setProductPage(1);
                }}
                className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-xs appearance-none pr-10"
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
                  <table className="w-full text-left bg-brand-mist-100/10">
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
                                onSelectProduct(product);
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
                  className="p-1.5 rounded-lg border border-brand-mist-300 hover:bg-brand-mist-50 disabled:opacity-50 text-brand-mist-600 transition"
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
                  className="p-1.5 rounded-lg border border-brand-mist-300 hover:bg-brand-mist-50 disabled:opacity-50 text-brand-mist-600 transition"
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
