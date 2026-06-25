"use client";

import { Image as ImageIcon } from "lucide-react";

interface ProductSelectorProps {
  selectedProduct: any;
  onSelect: (product: any) => void;
  onOpenModal: () => void;
}

export default function ProductSelector({
  selectedProduct,
  onSelect,
  onOpenModal,
}: ProductSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-brand-mist-800">
        Target Product
      </label>
      {selectedProduct ? (
        <div className="p-4 border border-brand-emerald-500 bg-brand-emerald-50/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-mist-100 flex items-center justify-center overflow-hidden border border-brand-mist-200">
              {selectedProduct.productPhotos?.[0]?.photoUrl ? (
                <img
                  src={selectedProduct.productPhotos[0].photoUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-5 h-5 text-brand-mist-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-brand-mist-800">
                {selectedProduct.name}
              </p>
              <p className="text-xs text-brand-mist-400 font-mono">
                ID: {selectedProduct.productId || selectedProduct.id}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenModal}
            className="text-xs font-bold text-brand-emerald-700 underline"
          >
            Change Product
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onOpenModal}
          className="w-full border border-dashed border-brand-mist-300 hover:border-brand-emerald-500 rounded-xl p-5 text-center text-sm font-medium text-brand-mist-500 transition-colors"
        >
          + Click to Browse Products
        </button>
      )}
    </div>
  );
}
