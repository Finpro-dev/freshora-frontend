"use client";

import { useRouter } from "next/navigation";
import ProductCard from "@/app/(main)/_components/ProductCard";
import ProductCardSkeleton from "@/app/(main)/_components/ProductCardSkeleton";
import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import type { ProductsResponse } from "../_hooks/use-public-products";

interface ProductListingProps {
  data: ProductsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}

export default function ProductListing({
  data,
  isLoading,
  isError,
}: ProductListingProps) {
  const router = useRouter();
  const { nearestStoreId } = useUserCoordinatesStore((state) => state);

  const products = data?.data || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-60 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 max-w-md text-center shadow-sm">
          <p className="font-semibold mb-1">Failed to Load Products</p>
          <p className="text-sm text-red-600">
            Please check your connection or try again later.
          </p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-60 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm max-w-md">
          <p className="text-6xl mb-4">📦</p>
          <p className="text-brand-mist-600 font-semibold text-lg mb-2">
            No products found
          </p>
          <p className="text-brand-mist-500 text-sm">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product) => {
        const totalQuantity =
          product.stocks?.reduce((sum, s) => sum + s.quantity, 0) ?? 0;

        return (
          <ProductCard
            key={product.productId}
            product={product}
            quantity={totalQuantity}
            storeId={nearestStoreId || undefined}
          />
        );
      })}
    </div>
  );
}
