"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  isGlobal: boolean;
  productItems: any[];
  categories: { id: string; name: string }[];
  isLoading: boolean;
  productSearch: string;
  onSearchChange: (v: string) => void;
  categoryFilter: string;
  onCategoryChange: (v: string) => void;
  productPage: number;
  totalProductPages: number;
  onPageChange: (p: number) => void;
  onSelectProduct: (product: any) => void;
}

export default function ProductModal({
  isOpen,
  onClose,
  isGlobal,
  productItems,
  categories,
  isLoading,
  productSearch,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  productPage,
  totalProductPages,
  onPageChange,
  onSelectProduct,
}: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-mist-100 rounded-2xl border border-brand-mist-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-4 border-b border-brand-mist-200 flex items-center justify-between bg-brand-mist-50">
          <h2 className="text-md font-bold text-brand-mist-800">
            {isGlobal ? "Global Product Catalog" : "Store Inventory Stocks"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-brand-mist-200 rounded-lg text-brand-mist-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-brand-mist-200 bg-brand-mist-100 flex gap-3">
          <input
            type="text"
            placeholder={
              isGlobal
                ? "Search by product name..."
                : "Search product in store inventory..."
            }
            value={productSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input flex-1 border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-xs"
          />
          {isGlobal && categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="select w-auto border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-xs rounded-xl px-3 py-2 appearance-none pr-8"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4 bg-brand-mist-100">
          {isLoading ? (
            <div className="h-48 flex flex-col items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-brand-emerald-700" />
            </div>
          ) : (
            <div className="border border-brand-mist-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left bg-brand-mist-100">
                <thead>
                  <tr className="bg-brand-mist-50 border-b border-brand-mist-200 text-brand-mist-600 uppercase font-bold">
                    <th className="p-3">Product Name</th>
                    {!isGlobal && (
                      <th className="p-3 text-center">Available Stock</th>
                    )}
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-mist-200 text-brand-mist-700">
                  {productItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={isGlobal ? 2 : 3}
                        className="p-8 text-center text-brand-mist-500 font-medium"
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
                            onClick={() => onSelectProduct(product)}
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

        {/* Pagination */}
        <div className="p-4 border-t border-brand-mist-200 bg-brand-mist-50 flex items-center justify-between text-xs">
          <span className="text-brand-mist-600">
            Page <strong>{productPage}</strong> of{" "}
            <strong>{totalProductPages}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={productPage === 1}
              onClick={() => onPageChange(Math.max(1, productPage - 1))}
              className="p-1.5 rounded-lg border border-brand-mist-300 bg-brand-mist-100 hover:bg-brand-mist-200 disabled:opacity-50 text-brand-mist-600 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={productPage >= totalProductPages}
              onClick={() =>
                onPageChange(Math.min(productPage + 1, totalProductPages))
              }
              className="p-1.5 rounded-lg border border-brand-mist-300 bg-brand-mist-100 hover:bg-brand-mist-200 disabled:opacity-50 text-brand-mist-600 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
