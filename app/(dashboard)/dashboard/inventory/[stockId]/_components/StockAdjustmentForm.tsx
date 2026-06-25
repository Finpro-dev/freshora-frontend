"use client";

import { CheckCircle2 } from "lucide-react";

interface StockAdjustmentFormProps {
  actionType: "ADD" | "DEDUCT";
  onActionTypeChange: (type: "ADD" | "DEDUCT") => void;
  qty: number;
  onQtyChange: (qty: number) => void;
}

export default function StockAdjustmentForm({
  actionType,
  onActionTypeChange,
  qty,
  onQtyChange,
}: StockAdjustmentFormProps) {
  return (
    <div className="bg-white border border-brand-mist-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
      {/* ADJUSTMENT TYPE TOGGLE */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-brand-mist-800">
          Adjustment
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onActionTypeChange("ADD")}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
              actionType === "ADD"
                ? "border-brand-emerald-600 bg-brand-emerald-50/50 text-brand-emerald-700 font-semibold"
                : "border-brand-mist-100 text-brand-mist-400 hover:bg-brand-mist-50"
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 ${actionType === "ADD" ? "opacity-100" : "opacity-0"}`}
            />
            <span className="text-sm">Stock In (+)</span>
          </button>

          <button
            type="button"
            onClick={() => onActionTypeChange("DEDUCT")}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
              actionType === "DEDUCT"
                ? "border-red-600 bg-red-50/50 text-red-700 font-semibold"
                : "border-brand-mist-100 text-brand-mist-400 hover:bg-brand-mist-50"
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 ${actionType === "DEDUCT" ? "opacity-100" : "opacity-0"}`}
            />
            <span className="text-sm">Stock Out (-)</span>
          </button>
        </div>
      </div>

      {/* QUANTITY INPUT */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-brand-mist-800">
          Mutation Quantity
        </label>
        <div className="relative">
          <input
            type="number"
            min="1"
            required
            className="w-full rounded-xl border border-brand-mist-300 p-3 pr-16 text-sm focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 outline-none"
            placeholder="Enter units quantity"
            value={qty || ""}
            onChange={(e) =>
              onQtyChange(Math.max(0, parseInt(e.target.value) || 0))
            }
          />
          <span className="absolute right-4 top-3 text-brand-mist-400 text-sm font-medium">
            Units
          </span>
        </div>
      </div>
    </div>
  );
}
