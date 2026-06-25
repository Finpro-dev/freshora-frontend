"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface PromotionHeaderProps {
  onCreateNew: () => void;
}

export default function PromotionHeader({ onCreateNew }: PromotionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-mist-200 pb-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-brand-mist-800">Promotions</h1>
        <p className="text-sm text-brand-mist-500">Promotions Management</p>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
        <button
          onClick={onCreateNew}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-emerald-700 text-white text-sm font-bold rounded-xl hover:bg-brand-emerald-800 shadow-md transition-all group flex-1 sm:flex-initial"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Create New Promotion
        </button>
      </div>
    </div>
  );
}
