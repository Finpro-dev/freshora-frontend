"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetStockById, useUpdateStock } from "../_hooks/use-stock";
import {
  Loader2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Scale,
} from "lucide-react";
import { toast } from "sonner";

export default function AdjustStockPage() {
  const params = useParams();
  const router = useRouter();
  const stockId = params?.stockId as string;

  const {
    data: stockData,
    isLoading: isFetchingStock,
    isError: isFetchError,
  } = useGetStockById(stockId);
  const updateStockMutation = useUpdateStock();

  const [actionType, setActionType] = useState<"ADD" | "DEDUCT">("ADD");
  const [qty, setQty] = useState<number>(0);

  if (isFetchingStock) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-brand-mist-50">
        <Loader2 className="w-10 h-10 animate-spin text-brand-emerald-700" />
        <p className="text-sm text-brand-mist-500 font-medium">
          Synchronizing inventory data...
        </p>
      </div>
    );
  }

  if (isFetchError || !stockData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-brand-mist-50">
        <div className="bg-white border border-red-100 rounded-2xl p-8 max-w-md text-center shadow-xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Reference Not Found
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            The stock record reference you are trying to access is unavailable.
          </p>
          <button
            onClick={() => router.push("/dashboard/inventory")}
            className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Return to Inventory
          </button>
        </div>
      </div>
    );
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (qty <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }

    // Convert value to negative if it's a deduction operation
    const calculatedQty =
      actionType === "DEDUCT" ? -Math.abs(qty) : Math.abs(qty);
    const activityType = actionType === "ADD" ? "MANUAL_ADD" : "MANUAL_DEDUCT"; // Maps to Prisma ActivityType enum

    try {
      await updateStockMutation.mutateAsync({
        productId: stockData.productId,
        storeId: stockData.storeId, // Locked onto the existing stock relation storeId
        quantityChange: calculatedQty,
        type: activityType,
      });

      toast.success("Stock ledger adjusted successfully");
      router.push("/dashboard/inventory");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit stock ledger adjustment",
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={() => router.push("/dashboard/inventory")}
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

        <form
          onSubmit={handleFormSubmit}
          className="bg-white border border-brand-mist-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
        >
          <div className="space-y-3">
            <label className="text-sm font-bold text-brand-mist-800">
              Adjustment
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setActionType("ADD")}
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
                onClick={() => setActionType("DEDUCT")}
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
                  setQty(Math.max(0, parseInt(e.target.value) || 0))
                }
              />
              <span className="absolute right-4 top-3 text-brand-mist-400 text-sm font-medium">
                Units
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
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
              disabled={updateStockMutation.isPending}
              className="px-8 py-2.5 bg-brand-emerald-700 text-white rounded-xl text-sm font-bold hover:bg-brand-emerald-800 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg transition"
            >
              {updateStockMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Scale className="w-4 h-4" />
                  Apply Adjustment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
