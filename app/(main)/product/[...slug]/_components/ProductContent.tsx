"use client";

import Link from "next/link";
import { FileText, ShieldCheck } from "lucide-react";

interface ProductContentProps {
  description: string;
  storageInstructions?: string;
}

function ProductContent({
  description,
  storageInstructions,
}: ProductContentProps) {
  return (
    <>
      <hr className="border-brand-mist-200 mb-6" />

      {/* Description Section */}
      {description && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-brand-emerald-700" />
            <h3 className="text-lg font-bold text-brand-mist-800">
              Product Description
            </h3>
          </div>
          <div className="bg-brand-mist-100/10 border border-brand-mist-200 rounded-xl p-4 md:p-5">
            <p className="text-brand-mist-700 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      )}

      {/* Storage Instructions Section */}
      {storageInstructions && (
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl px-5 py-4 flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Storage Instructions
            </h4>
            <p className="text-sm text-amber-700 leading-relaxed">
              {storageInstructions}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductContent;
