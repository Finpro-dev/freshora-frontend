"use client";

import { Info, ShieldCheck } from "lucide-react";

interface ProductDescriptionProps {
  description: string;
  storageInstructions: string;
}

export default function ProductDescription({
  description,
  storageInstructions,
}: ProductDescriptionProps) {
  return (
    <div className="space-y-4">
      {/* Description */}
      <div className="space-y-1.5">
        <h3 className="text-sm font-bold text-brand-mist-800 uppercase tracking-wider">
          Product Description
        </h3>
        <p className="text-sm text-brand-mist-600 leading-relaxed bg-brand-mist-25 p-3 rounded-lg border border-dashed border-brand-mist-200">
          {description || "No description provided for this product."}
        </p>
      </div>

      {/* Storage Instructions */}
      {storageInstructions && (
        <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl flex gap-3 items-start">
          <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Storage Instructions
            </h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              {storageInstructions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
