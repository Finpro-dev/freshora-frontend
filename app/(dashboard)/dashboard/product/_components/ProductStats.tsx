"use client";

import { Package } from "lucide-react";

interface ProductStatsProps {
  totalProducts: number;
  outOfStockCount: number;
}

export default function ProductStats({
  totalProducts,
  outOfStockCount,
}: ProductStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="bg-brand-mist-100/10 rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-brand-mist-500">Total Products</span>
          <Package className="w-5 h-5 text-brand-emerald-600" />
        </div>
        <p className="text-2xl font-bold text-brand-mist-800">
          {totalProducts}
        </p>
      </div>

      <div className="bg-brand-mist-100/10 rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-brand-mist-500">Out of Stock</span>
          <Package className="w-5 h-5 text-red-600" />
        </div>
        <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
        <p className="text-xs text-red-600 mt-1">Needs restock</p>
      </div>
    </div>
  );
}
