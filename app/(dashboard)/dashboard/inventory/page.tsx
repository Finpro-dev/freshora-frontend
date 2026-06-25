"use client";

import { useState } from "react";
import { toast } from "sonner";
import InventoryHeader from "./_components/InventoryHeader";
import StoreFilter from "./_components/StoreFilter";
import StockTable from "./_components/StockTable";
import { StoreData } from "./_hooks/use-stock";

export default function StockOverviewPage() {
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);

  const userRole = "SUPER_ADMIN" as "SUPER_ADMIN" | "STORE_ADMIN";

  const handleSelectStore = (store: StoreData | null) => {
    setSelectedStore(store);
    if (store) {
      toast.success(`Active view filter updated to: ${store.name}`);
    } else {
      toast.success("Filter cleared. Displaying all warehouse grids.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8 space-y-6 relative">
      <InventoryHeader />
      <StoreFilter
        userRole={userRole}
        selectedStore={selectedStore}
        onSelectStore={handleSelectStore}
      />
      <StockTable selectedStore={selectedStore} />
    </div>
  );
}
