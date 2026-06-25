"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CategoryHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        type="button"
        onClick={() => router.push("/dashboard/product")}
        className="p-2 hover:bg-brand-mist-100 rounded-lg transition-colors text-brand-mist-600 flex items-center justify-center border border-brand-mist-200 bg-white shadow-sm"
        title="Back to Products"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-brand-mist-800">
          Product Categories
        </h1>
        <p className="text-sm text-brand-mist-500">
          Manage your store&apos;s product classifications and master data.
        </p>
      </div>
    </div>
  );
}
