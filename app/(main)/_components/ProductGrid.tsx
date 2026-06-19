"use client";

import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { ProductStockDiscount } from "@/shared/types/product-stock-discount-type";
import { useGetProducts } from "../_hooks/use-get-product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductGrid() {
  const { nearestStoreId: storeId, isLoading: isGetNearestStoreLoading } =
    useUserCoordinatesStore((state) => state);
  const { data, isLoading: isGetProductsLoading } = useGetProducts(storeId);

  const product: ProductStockDiscount[] = data?.data?.products;

  const isLoading = isGetProductsLoading || !data || isGetNearestStoreLoading;

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {isLoading ? (
        Array.from({ length: 8 })?.map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      ) : !product?.length ? (
        <p>No product available at the moment</p>
      ) : (
        product?.map((product, i: number) => (
          <ProductCard
            key={i}
            product={product?.product}
            quantity={product.quantity}
          />
        ))
      )}
    </div>
  );
}

export default ProductGrid;
