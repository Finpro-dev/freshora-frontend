"use client";

import { Package } from "lucide-react";

interface ProductInfoPanelProps {
  product: any;
  totalStock: number;
  hasDiscount: boolean;
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
}

export default function ProductInfoPanel({
  product,
  totalStock,
  hasDiscount,
  originalPrice,
  finalPrice,
  discountAmount,
}: ProductInfoPanelProps) {
  return (
    <div className="space-y-6">
      {/* Title & Badges */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-emerald-700 bg-brand-emerald-100 px-2.5 py-1 rounded-md">
          {product.productCategory?.category || "Uncategorized"}
        </span>
        <h2 className="text-3xl font-bold text-brand-mist-800 tracking-tight">
          {product.name}
        </h2>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-xs bg-brand-mist-100 text-brand-mist-700 px-2 py-0.5 rounded-md font-medium">
            Grade {product.grade || "A"}
          </span>
          <span className="text-xs bg-brand-mist-100 text-brand-mist-700 px-2 py-0.5 rounded-md font-medium">
            {product.dietType === "DEFAULT" ? "Regular Diet" : product.dietType}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="p-4 bg-brand-mist-50 rounded-xl border border-brand-mist-100 space-y-1">
        <span className="text-xs text-brand-mist-500 font-medium">
          Price Listing
        </span>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-brand-emerald-800">
            Rp {finalPrice.toLocaleString("id-ID")}
          </span>
          {hasDiscount && (
            <span className="text-sm text-brand-mist-400 line-through font-medium">
              Rp {originalPrice.toLocaleString("id-ID")}
            </span>
          )}
        </div>
        {hasDiscount && (
          <p className="text-xs text-red-500 font-semibold pt-1 flex items-center gap-1">
            Save Rp {discountAmount.toLocaleString("id-ID")} with active
            discount requirements.
          </p>
        )}
      </div>

      {/* Stock & Availability */}
      <div className="flex items-center gap-4 py-2 border-y border-brand-mist-100">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-brand-mist-400" />
          <span className="text-sm text-brand-mist-600">
            Total Stock Availability:{" "}
            <strong className="text-brand-mist-800">
              {totalStock} {product.unit || "KG"}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${totalStock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
          />
          <span className="text-xs font-semibold text-brand-mist-700">
            {totalStock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-brand-mist-800 uppercase tracking-wider flex items-center gap-2">
          <svg
            className="w-4 h-4 text-brand-emerald-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Specifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm bg-brand-mist-100/10 p-4 rounded-xl border border-brand-mist-200 shadow-sm">
          <div className="flex justify-between py-1.5 border-b border-brand-mist-100">
            <span className="text-brand-mist-500">Weight per Unit</span>
            <span className="font-semibold text-brand-mist-800">
              {product.weightPerGram} grams
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-brand-mist-100">
            <span className="text-brand-mist-500">Measurement Unit</span>
            <span className="font-semibold text-brand-mist-800">
              {product.unit || "KG"}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-brand-mist-100 sm:border-b-0">
            <span className="text-brand-mist-500">Quality Standard</span>
            <span className="font-semibold text-brand-mist-800">
              Premium Grade {product.grade || "A"}
            </span>
          </div>
          <div className="flex justify-between py-1.5 sm:border-b-0">
            <span className="text-brand-mist-500">Dietary Property</span>
            <span className="font-semibold text-brand-mist-800">
              {product.dietType || "DEFAULT"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
