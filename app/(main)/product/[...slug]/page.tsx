"use client";

import { useParams } from "next/navigation";
import { useRef } from "react";
import { useGetProductBySlug } from "../_hooks/use-get-product-by-slug";
import { useAddToCart } from "@/shared/hooks/use-cart";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CLICK_DEBOUNCE_MS } from "../../_statics/cart-click-debounce-static";
import {
  calculateTotalPrice,
  calculateDiscount,
} from "../../_utils/carousel-product-util";
import { capitalize } from "@/shared/utils/capitalize";
import defaultProductThumbnail from "@/public/product/default-product-image.jpeg";
import Link from "next/link";
import ProductGallery from "./_components/ProductGallery";
import CartButton from "./_components/CartButton";
import ProductContent from "./_components/ProductContent";

function ProductDetailSkeleton() {
  return (
    <div className="min-h-dvh w-full animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-brand-mist-200 rounded-2xl h-96 md:h-[500px]" />
          <div className="flex flex-col gap-5">
            <div className="h-5 bg-brand-mist-200 rounded w-24" />
            <div className="h-9 bg-brand-mist-200 rounded w-3/4" />
            <div className="h-5 bg-brand-mist-200 rounded w-1/2" />
            <div className="flex gap-4 mt-2">
              <div className="h-8 bg-brand-mist-200 rounded w-28" />
              <div className="h-8 bg-brand-mist-200 rounded w-24" />
            </div>
            <div className="h-10 bg-brand-mist-200 rounded w-40" />
            <div className="h-14 bg-brand-mist-200 rounded w-full mt-4" />
            <div className="h-32 bg-brand-mist-200 rounded w-full" />
            <div className="h-14 bg-brand-mist-200 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductNotFound() {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-7xl mb-4">🔍</p>
        <h2 className="text-2xl font-bold text-brand-mist-800 mb-2">
          Product Not Found
        </h2>
        <p className="text-brand-mist-500 mb-6">
          Sorry, the product you are looking for is not available or has been
          removed.
        </p>
        <Link
          href="/product"
          className="inline-block px-6 py-3 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}

interface DiscountLike {
  discountAmount: string | null;
  validUntil: string;
}

function useFormattedPrice(productPrice: number, discounts: DiscountLike[]) {
  const activeDiscount = discounts?.[0];
  const hasDiscount =
    !!activeDiscount && Number(activeDiscount.discountAmount) > 0;

  const price = hasDiscount
    ? calculateTotalPrice(
        Number(productPrice),
        Number(activeDiscount!.discountAmount),
      )
    : Number(productPrice);

  const originalPrice = hasDiscount
    ? calculateDiscount(
        Number(productPrice),
        Number(activeDiscount!.discountAmount),
      )
    : null;

  return { price, originalPrice, activeDiscount, hasDiscount };
}

function useProductStock(stocks: { quantity: number }[] | undefined) {
  const totalQuantity = stocks?.reduce((sum, s) => sum + s.quantity, 0) ?? 0;
  const isOutOfStock = totalQuantity === 0;

  return { totalQuantity, isOutOfStock };
}
function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string[] | undefined;
  const actualSlug = Array.isArray(slug) ? slug[0] : slug || "";

  const router = useRouter();
  const userId = useAuthStore((state) => state.userId);
  const isVerified = useAuthStore((state) => state.isVerified);
  const nearestStoreId = useUserCoordinatesStore(
    (state) => state.nearestStoreId,
  );

  const addToCart = useAddToCart();
  const lastAddToCartRef = useRef(0);

  const { data, isLoading, isError } = useGetProductBySlug({
    slug: actualSlug,
  });
  const product = data?.data;

  const isAuth = Boolean(userId && isVerified);
  const effectiveStoreId = nearestStoreId;
  const isAddingToCart = addToCart.isPending;

  const handleAddToCart = async () => {
    if (!product) return;

    if (!isAuth) {
      toast.error("Please log in first to add items to your cart");
      router.push("/login");
      return;
    }

    const now = Date.now();
    if (now - lastAddToCartRef.current < CLICK_DEBOUNCE_MS) return;
    lastAddToCartRef.current = now;

    const { isOutOfStock } = useProductStock(product.stocks);

    if (isOutOfStock) return;
    if (!effectiveStoreId) {
      toast.error(
        "Unable to determine your nearest store. Please allow location access.",
      );
      return;
    }

    try {
      await addToCart.mutateAsync({
        productId: product.productId,
        storeId: effectiveStoreId,
        quantity: 1,
      });
    } catch {}
  };

  if (isLoading) return <ProductDetailSkeleton />;
  if (isError || !product) return <ProductNotFound />;

  const {
    productPhotos,
    name,
    price: productPrice,
    description,
    weightPerGram,
    unit,
    grade,
    dietType,
    storageInstructions,
    discounts,
    productCategory,
  } = product;

  const { totalQuantity, isOutOfStock } = useProductStock(product.stocks);
  const { price, originalPrice, activeDiscount, hasDiscount } =
    useFormattedPrice(productPrice, discounts);

  const productImages = productPhotos?.length
    ? productPhotos.map((p) => p.photoUrl)
    : [defaultProductThumbnail];

  return (
    <div className="min-h-dvh w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Back Link */}
        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-brand-mist-500 hover:text-brand-mist-800 mb-6 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <ProductGallery images={productImages} name={name} />

          {/* Right Column: Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <span className="inline-block w-fit px-3 py-1 bg-brand-mist-100 text-brand-mist-700 text-xs font-medium rounded-full mb-3">
              {productCategory?.category || "Product"}
            </span>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-mist-800 mb-3 tracking-tight">
              {name}
            </h1>

            {/* Grade & Unit Badges */}
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-orange-50 text-orange-800 text-xs font-semibold rounded-full border border-orange-200">
                Grade {capitalize(grade)}
              </span>
              <span className="px-3 py-1 bg-brand-mist-100 text-brand-mist-700 text-xs font-medium rounded-full border border-brand-mist-200">
                {capitalize(unit)}
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-4 mb-5">
              <p className="text-orange-900 text-3xl md:text-4xl font-bold">
                Rp {price.toLocaleString("id-ID")}
              </p>
              {hasDiscount && originalPrice !== null ? (
                <p className="text-brand-mist-400 text-lg line-through">
                  Rp {originalPrice.toLocaleString("id-ID")}
                </p>
              ) : null}
            </div>

            {/* Discount Badge */}
            {hasDiscount && activeDiscount ? (
              <div className="mb-5">
                <span className="inline-block px-3 py-1.5 bg-red-50 text-red-700 text-sm font-semibold rounded-lg border border-red-200">
                  Save {Number(activeDiscount.discountAmount)}%
                </span>
                <span className="text-xs text-brand-mist-500 ml-3">
                  Valid until{" "}
                  {new Date(activeDiscount.validUntil).toLocaleDateString(
                    "en-US",
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </span>
              </div>
            ) : null}

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-brand-mist-100/10 border border-brand-mist-200 rounded-xl px-4 py-3">
                <p className="text-xs text-brand-mist-500 mb-1">Weight</p>
                <p className="text-brand-mist-800 font-semibold">
                  {Number(weightPerGram).toLocaleString("id-ID")} gram
                </p>
              </div>
              <div className="bg-brand-mist-100/10 border border-brand-mist-200 rounded-xl px-4 py-3">
                <p className="text-xs text-brand-mist-500 mb-1">Unit</p>
                <p className="text-brand-mist-800 font-semibold">
                  {capitalize(unit)}
                </p>
              </div>
              <div className="bg-brand-mist-100/10 border border-brand-mist-200 rounded-xl px-4 py-3">
                <p className="text-xs text-brand-mist-500 mb-1">Category</p>
                <p className="text-brand-mist-800 font-semibold">
                  {productCategory?.category || "-"}
                </p>
              </div>
              <div className="bg-brand-mist-100/10 border border-brand-mist-200 rounded-xl px-4 py-3">
                <p className="text-xs text-brand-mist-500 mb-1">Diet Type</p>
                <p className="text-brand-mist-800 font-semibold">
                  {capitalize(dietType)}
                </p>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {totalQuantity > 0 ? (
                <p className="text-emerald-700 text-sm font-medium bg-emerald-50/60 inline-block px-3 py-1.5 rounded-lg border border-emerald-200">
                  In stock: {totalQuantity} {capitalize(unit)}
                </p>
              ) : (
                <p className="text-red-600 text-sm font-medium bg-red-50/60 inline-block px-3 py-1.5 rounded-lg border border-red-200">
                  Out of stock
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="mb-8">
              <CartButton
                isOutOfStock={isOutOfStock}
                isAddingToCart={isAddingToCart}
                onClick={handleAddToCart}
              />
            </div>

            {/* Description & Storage */}
            <ProductContent
              description={description}
              storageInstructions={storageInstructions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return <ProductDetail />;
}
