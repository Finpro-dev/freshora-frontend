"use client";

import { ArrowLeft } from "lucide-react";
import { StockData } from "../../_hooks/use-stock";

interface StockAdjustmentHeaderProps {
  stockData: StockData;
  onBack: () => void;
}

export default function StockAdjustmentHeader({
  stockData,
  onBack,
}: StockAdjustmentHeaderProps) {
  return (
    <>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-sm text-brand-mist-500 hover:text-brand-emerald-700 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Inventory
      </button>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-brand-mist-900">
          Stock Adjustment
        </h1>
        <div className="flex items-center gap-2 text-sm text-brand-mist-500">
          <span>Product:</span>
          <span className="font-semibold text-brand-emerald-700 bg-brand-emerald-50 px-2 py-0.5 rounded">
            {stockData.product?.name || "Unknown Product"}
          </span>
          <span className="text-brand-mist-300">|</span>
          <span>
            Current Balance:{" "}
            <strong className="text-brand-mist-700">
              {stockData.quantity} Units
            </strong>
          </span>
        </div>
      </div>
    </>
  );
}
