"use client";

import { useRouter } from "next/navigation";
import { Plus, History } from "lucide-react";

export default function InventoryHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-mist-200 pb-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-brand-mist-800">
          Inventory Stock Ledger
        </h1>
        <p className="text-sm text-brand-mist-500">
          Real-time unit levels and master catalog distribution control grid.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
        <button
          onClick={() => router.push("/dashboard/inventory/journals")}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-brand-mist-300 text-brand-mist-700 hover:bg-brand-mist-50 text-sm font-bold rounded-xl shadow-sm transition-all group flex-1 sm:flex-initial"
        >
          <History className="w-4 h-4 text-brand-mist-500 group-hover:rotate-[-15deg] transition-transform" />
          Stock Journals
        </button>

        <button
          onClick={() => router.push("/dashboard/inventory/add-stock")}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-emerald-700 text-white text-sm font-bold rounded-xl hover:bg-brand-emerald-800 shadow-md transition-all group flex-1 sm:flex-initial"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Initialize New Stock
        </button>
      </div>
    </div>
  );
}
