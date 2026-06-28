"use client";

import { Plus, Layers, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductHeaderProps {
  isSuperAdmin: boolean;
  onAddProduct: () => void;
  onManageCategories: () => void;
}

export default function ProductHeader({
  isSuperAdmin,
  onAddProduct,
  onManageCategories,
}: ProductHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-mist-800">Products</h1>
        <p className="text-brand-mist-500">Manage your product catalog</p>
      </div>

      {isSuperAdmin && (
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            type="button"
            className="group flex items-center gap-2 px-4 py-2 border border-brand-mist-300 text-brand-mist-700 bg-brand-mist-100/10 rounded-lg hover:text-brand-emerald-700 hover:border-brand-emerald-300 hover:bg-brand-mist-100/20 transition-all duration-200 text-sm font-medium shadow-sm"
            onClick={onManageCategories}
          >
            <Layers className="w-4 h-4 text-brand-mist-500 group-hover:text-brand-emerald-600 transition-colors duration-200" />
            <span>Manage Categories</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-mist-400 group-hover:text-brand-emerald-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium"
            onClick={onAddProduct}
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      )}
    </div>
  );
}
