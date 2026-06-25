"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreatePromotionHeaderProps {
  onBack: () => void;
  isGlobal: boolean;
}

export default function CreatePromotionHeader({
  onBack,
  isGlobal,
}: CreatePromotionHeaderProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="group flex items-center gap-2 text-sm text-brand-mist-500 hover:text-brand-emerald-700 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Promotions
      </button>
      <h1 className="text-2xl font-bold text-brand-mist-800 mt-2">
        Create New Promotion
        <span className="text-xs ml-2 px-2.5 py-1 rounded-full bg-brand-mist-100 text-brand-mist-600 font-normal">
          {isGlobal ? "Global Mode" : "Store Mode"}
        </span>
      </h1>
    </div>
  );
}
