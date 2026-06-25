"use client";

import { ArrowLeft, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductDetailHeaderProps {
  productId: string;
}

export default function ProductDetailHeader({
  productId,
}: ProductDetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 hover:bg-brand-mist-100 rounded-lg transition-colors text-brand-mist-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-brand-mist-800">
            Product Details
          </h1>
          <p className="text-xs text-brand-mist-500">
            View complete specifications and stock status.
          </p>
        </div>
      </div>

      <Link
        href={`/dashboard/product/${productId}`}
        className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-50 text-brand-emerald-700 border border-brand-emerald-200 rounded-lg hover:bg-brand-emerald-100 transition-colors text-sm font-medium"
      >
        <Edit3 className="w-4 h-4" />
        Edit Product
      </Link>
    </div>
  );
}
