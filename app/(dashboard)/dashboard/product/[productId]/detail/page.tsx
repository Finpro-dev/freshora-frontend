"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetProductById } from "../../_hooks/use-edit-product"; // Menggunakan hook yang sama
import {
  ArrowLeft,
  Edit3,
  Loader2,
  Package,
  Tag,
  ShieldCheck,
  Info,
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  // Fetch product data using the existing hook
  const { data: product, isLoading, error } = useGetProductById(productId);

  // State to manage which photo is currently selected/viewed
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-brand-mist-600 gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm font-medium">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-brand-mist-600 gap-4">
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
      {/* Navigation Header */}
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

        {/* Link back to Edit Page (which is located at the parent folder /[productId]) */}
        <Link
          href={`/dashboard/product/${productId}`}
          className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-50 text-brand-emerald-700 border border-brand-emerald-200 rounded-lg hover:bg-brand-emerald-100 transition-colors text-sm font-medium"
        >
          <Edit3 className="w-4 h-4" />
          Edit Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Image Gallery (4 Cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="aspect-square w-full rounded-2xl overflow-hidden border border-brand-mist-200 bg-brand-mist-50 shadow-sm relative">
            {product.productPhotos && product.productPhotos.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.productPhotos[activePhotoIndex]?.photoUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-brand-mist-400 gap-2">
                <Package className="w-12 h-12 stroke-[1.5]" />
                <span className="text-xs">No image available</span>
              </div>
            )}

            {/* Discount Badge on Image */}
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                <Tag className="w-3 h-3" />
                PROMO
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.productPhotos && product.productPhotos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.productPhotos.map((photo: any, idx: number) => (
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

        {/* RIGHT COLUMN: Product Information (7 Cols) */}
        <div className="md:col-span-7 space-y-6">
          {/* Title & Badges */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-emerald-700 bg-brand-emerald-50 px-2.5 py-1 rounded-md">
              {product.productCategory?.category || "Uncategorized"}
            </span>
            <h2 className="text-3xl font-bold text-brand-mist-800 tracking-tight">
              {product.name}
            </h2>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs bg-brand-mist-100 text-brand-mist-700 px-2 py-0.5 rounded-md font-medium">
                Grade {product.grade || "A"}
              </span>
              <span className="text-xs bg-brand-mist-100 text-brand-mist-700 px-2 py-0.5 rounded-md font-medium">
                {product.dietType === "DEFAULT"
                  ? "Regular Diet"
                  : product.dietType}
              </span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="p-4 bg-brand-mist-50 rounded-xl border border-brand-mist-100 space-y-1">
            <span className="text-xs text-brand-mist-500 font-medium">
              Price Listing
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-brand-emerald-800">
                Rp {finalPrice.toLocaleString("id-ID")}
              </span>
              {hasDiscount && (
                <span className="text-sm text-brand-mist-400 line-through font-medium">
                  Rp {originalPrice.toLocaleString("id-ID")}
                </span>
              )}
            </div>
            {hasDiscount && (
              <p className="text-xs text-red-500 font-semibold pt-1 flex items-center gap-1">
                Save Rp {discountAmount.toLocaleString("id-ID")} with active
                discount requirements.
              </p>
            )}
          </div>

          {/* Stock & Availability summary */}
          <div className="flex items-center gap-4 py-2 border-y border-brand-mist-100">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-mist-400" />
              <span className="text-sm text-brand-mist-600">
                Total Stock Availability:{" "}
                <strong className="text-brand-mist-800">
                  {totalStock} {product.unit || "KG"}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${totalStock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
              />
              <span className="text-xs font-semibold text-brand-mist-700">
                {totalStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-brand-mist-800 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-emerald-700" />
              Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm bg-white p-4 rounded-xl border border-brand-mist-200 shadow-sm">
              <div className="flex justify-between py-1.5 border-b border-brand-mist-100">
                <span className="text-brand-mist-500">Weight per Unit</span>
                <span className="font-semibold text-brand-mist-800">
                  {product.weightPerGram} grams
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-brand-mist-100">
                <span className="text-brand-mist-500">Measurement Unit</span>
                <span className="font-semibold text-brand-mist-800">
                  {product.unit || "KG"}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-brand-mist-100 sm:border-b-0">
                <span className="text-brand-mist-500">Quality Standard</span>
                <span className="font-semibold text-brand-mist-800">
                  Premium Grade {product.grade || "A"}
                </span>
              </div>
              <div className="flex justify-between py-1.5 sm:border-b-0">
                <span className="text-brand-mist-500">Dietary Property</span>
                <span className="font-semibold text-brand-mist-800">
                  {product.dietType || "DEFAULT"}
                </span>
              </div>
            </div>
          </div>

          {/* Description & Storage */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-brand-mist-800 uppercase tracking-wider">
                Product Description
              </h3>
              <p className="text-sm text-brand-mist-600 leading-relaxed bg-brand-mist-25 p-3 rounded-lg border border-dashed border-brand-mist-200">
                {product.description ||
                  "No description provided for this product."}
              </p>
            </div>

            {product.storageInstructions && (
              <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-xl flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Storage Instructions
                  </h4>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    {product.storageInstructions}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
