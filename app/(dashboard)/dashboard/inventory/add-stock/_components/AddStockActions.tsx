"use client";

import { Loader2, PlusCircle } from "lucide-react";

interface AddStockActionsProps {
  initialQty: number;
  onQtyChange: (qty: number) => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function AddStockActions({
  initialQty,
  onQtyChange,
  onCancel,
  isPending,
}: AddStockActionsProps) {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-bold text-brand-mist-800">
          Initial Stock Quantity
        </label>
        <div className="relative">
          <input
            type="number"
            min="1"
            required
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm pr-16"
            placeholder="0"
            value={initialQty || ""}
            onChange={(e) =>
              onQtyChange(Math.max(0, parseInt(e.target.value) || 0))
            }
          />
          <span className="absolute right-4 top-3 text-brand-mist-400 text-sm font-medium">
            Units
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-brand-mist-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-brand-mist-500 hover:bg-brand-mist-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-2.5 bg-brand-emerald-700 text-white rounded-xl text-sm font-bold hover:bg-brand-emerald-800 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg transition"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <PlusCircle className="w-4 h-4" /> Initialize Stock
            </>
          )}
        </button>
      </div>
    </>
  );
}
