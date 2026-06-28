"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: (string | import("next/image").StaticImageData)[];
  name: string;
}

function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Ensure we always display a valid src (Next.js Image accepts string | StaticImageData)
  const mainImage = images[selectedImageIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full h-80 sm:h-96 md:h-[480px] lg:h-[540px] bg-brand-mist-100 rounded-2xl overflow-hidden">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              type="button"
              className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-brand-emerald-600 shadow-md"
                  : "border-brand-mist-200 hover:border-brand-mist-400"
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${name} - thumbnail ${index + 1}`}
                fill
                className="object-cover object-center"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
