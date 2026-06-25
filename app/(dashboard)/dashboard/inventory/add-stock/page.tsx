"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useUpdateStock,
  useGetStoresPaginated,
  useGetProducts,
} from "../_hooks/use-stock";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { toast } from "sonner";
import AddStockHeader from "./_components/AddStockHeader";
import StoreSection from "./_components/StoreSection";
import ProductSelector from "./_components/ProductSelector";
import AddStockActions from "./_components/AddStockActions";
import { StoreData } from "../_hooks/use-stock";

export default function AddStockPage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const storeId = useAuthStore((state) => state.storeId);
  const isSuperAdmin = role === "SUPER_ADMIN";

  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [initialQty, setInitialQty] = useState<number>(0);

  const targetStoreId = isSuperAdmin
    ? selectedStore?.storeId || ""
    : storeId || "";

  if (role === "STORE_ADMIN" && !storeId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-mist-50/50">
        <div className="flex flex-col items-center gap-3 max-w-sm text-center">
          <h2 className="text-lg font-bold text-brand-mist-800">
            Store Assignment Required
          </h2>
          <p className="text-sm text-brand-mist-500">
            Your account is not yet assigned to any store. Please contact
            SUPER_ADMIN.
          </p>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-4 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg text-sm font-medium hover:bg-brand-emerald-800 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSuperAdmin && !selectedStore) {
      return toast.error("Please select a target store location");
    }
    if (!targetStoreId) {
      return toast.error("Store ID not available");
    }
    if (!selectedProduct) {
      return toast.error("Please select a product from the catalog");
    }
    if (initialQty <= 0) {
      return toast.error("Initial quantity must be greater than zero");
    }

    try {
      await createStockMutation.mutateAsync({
        productId: selectedProduct.productId,
        storeId: targetStoreId,
        quantityChange: initialQty,
        type: "MANUAL_ADD",
      });
      toast.success("New stock successfully initialized");
      router.push("/dashboard/inventory");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to initialize stock entry",
      );
    }
  };

  const createStockMutation = useUpdateStock();

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <AddStockHeader onBack={() => router.push("/dashboard/inventory")} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <StoreSection
            isSuperAdmin={isSuperAdmin}
            selectedStore={selectedStore}
            onSelectStore={setSelectedStore}
            storeId={storeId}
          />
          <ProductSelector
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
          <AddStockActions
            initialQty={initialQty}
            onQtyChange={setInitialQty}
            onCancel={() => router.push("/dashboard/inventory")}
            isPending={createStockMutation.isPending}
          />
        </form>
      </div>
    </div>
  );
}
