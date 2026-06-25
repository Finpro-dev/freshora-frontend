"use client";

import { ArrowLeft } from "lucide-react";

interface AddStockHeaderProps {
  onBack: () => void;
}

export default function AddStockHeader({ onBack }: AddStockHeaderProps) {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="group flex items-center gap-2 text-sm text-brand-mist-500 hover:text-brand-emerald-700 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Inventory
      </button>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-brand-mist-800">
          Initialize New Stock
        </h1>
        <p className="text-sm text-brand-mist-500">
          Register a product into a specific store inventory.
        </p>
      </div>
    </>
  );
}
