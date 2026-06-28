"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetStockById,
  useUpdateStock,
  StockData,
} from "../_hooks/use-stock";
import { toast } from "sonner";
import StockAdjustmentHeader from "./_components/StockAdjustmentHeader";
import StockAdjustmentForm from "./_components/StockAdjustmentForm";
import StockAdjustmentActions from "./_components/StockAdjustmentActions";

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-brand-mist-50/50">
        <span className="text-sm text-brand-mist-500 font-medium">
          Synchronizing inventory data...
        </span>
      </div>
    );
  }

  if (isFetchError || !stockData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-brand-mist-50/50">
        <div className="bg-brand-mist-100/10 border border-brand-mist-200 rounded-2xl p-8 max-w-md text-center shadow-sm">
          <h2 className="text-xl font-bold text-brand-mist-800 mb-2">
            Reference Not Found
          </h2>
          <p className="text-sm text-brand-mist-500 mb-6">
            The stock record reference you are trying to access is unavailable.
          </p>
          <button
            onClick={() => router.push("/dashboard/inventory")}
            className="w-full py-2.5 bg-brand-emerald-700 text-white rounded-lg font-medium hover:bg-brand-emerald-800 transition-colors"
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

    const calculatedQty =
      actionType === "DEDUCT" ? -Math.abs(qty) : Math.abs(qty);
    const activityType = actionType === "ADD" ? "MANUAL_ADD" : "MANUAL_DEDUCT";

    try {
      await updateStockMutation.mutateAsync({
        productId: stockData.productId,
        storeId: stockData.storeId,
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
        <StockAdjustmentHeader
          stockData={stockData}
          onBack={() => router.push("/dashboard/inventory")}
        />
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <StockAdjustmentForm
            actionType={actionType}
            onActionTypeChange={setActionType}
            qty={qty}
            onQtyChange={setQty}
          />
          <StockAdjustmentActions
            onCancel={() => router.push("/dashboard/inventory")}
            isPending={updateStockMutation.isPending}
          />
        </form>
      </div>
    </div>
  );
}
