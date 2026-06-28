"use client";

import Link from "next/link";

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

      {description && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-brand-mist-800 mb-2">
            Product Description
          </h3>
          <p className="text-brand-mist-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {storageInstructions && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
          <h3 className="text-sm font-bold text-amber-800 mb-1">
            Storage Instructions
          </h3>
          <p className="text-amber-700 text-sm leading-relaxed">
            {storageInstructions}
          </p>
        </div>
      )}
    </>
  );
}

export default ProductContent;
