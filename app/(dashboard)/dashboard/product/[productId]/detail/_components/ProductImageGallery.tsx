"use client";

import { useState } from "react";
import { Package, Tag } from "lucide-react";

interface ProductImageGalleryProps {
  photos: { photoUrl: string }[];
  productName: string;
  hasDiscount: boolean;
}

export default function ProductImageGallery({
  photos,
  productName,
  hasDiscount,
}: ProductImageGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square w-full rounded-2xl overflow-hidden border border-brand-mist-200 bg-brand-mist-50 shadow-sm relative">
        {photos.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[activePhotoIndex]?.photoUrl}
            alt={productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-brand-mist-400 gap-2">
            <Package className="w-12 h-12 stroke-[1.5]" />
            <span className="text-xs">No image available</span>
          </div>
        )}

        {hasDiscount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
            <Tag className="w-3 h-3" />
            PROMO
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setActivePhotoIndex(idx)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-brand-mist-50 ${
                activePhotoIndex === idx
                  ? "border-brand-emerald-600 scale-95"
                  : "border-brand-mist-200 opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.photoUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
