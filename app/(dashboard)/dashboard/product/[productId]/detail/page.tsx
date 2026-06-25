"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetProductById } from "../../_hooks/use-edit-product";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ProductDetailHeader from "./_components/ProductDetailHeader";
import ProductImageGallery from "./_components/ProductImageGallery";
import ProductInfoPanel from "./_components/ProductInfoPanel";
import ProductDescription from "./_components/ProductDescription";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const { data: product, isLoading, error } = useGetProductById(productId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm font-medium text-brand-mist-500">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-sm font-medium text-red-500">
          Product not found or an error occurred.
        </p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-brand-emerald-700 text-white rounded-lg text-sm"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Calculate discount status
  const originalPrice = Number(product.price);
  const finalPrice = Number(product.finalPrice);
  const hasDiscount = finalPrice < originalPrice;
  const discountAmount = originalPrice - finalPrice;

  // Calculate total stock from stocks array
  const totalStock =
    product.stocks?.reduce(
      (acc: number, curr: any) => acc + (curr.qty || 0),
      0,
    ) || 0;

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      <ProductDetailHeader productId={productId} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5">
          <ProductImageGallery
            photos={product.productPhotos || []}
            productName={product.name}
            hasDiscount={hasDiscount}
          />
        </div>
        <div className="md:col-span-7 space-y-6">
          <ProductInfoPanel
            product={product}
            totalStock={totalStock}
            hasDiscount={hasDiscount}
            originalPrice={originalPrice}
            finalPrice={finalPrice}
            discountAmount={discountAmount}
          />
          <ProductDescription
            description={product.description}
            storageInstructions={product.storageInstructions}
          />
        </div>
      </div>
    </div>
  );
}
