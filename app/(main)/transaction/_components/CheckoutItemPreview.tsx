"use client";

import Image from "next/image";

interface Discount {
  discountId: string;
  discountAmount: string;
  type: string;
}

interface ProductPhoto {
  photoUrl: string;
}

interface Product {
  productId: string;
  serialNumber: string;
  name: string;
  slug: string;
  productCategoryId: string;
  price: string; // e.g., "18000"
  description: string;
  weightPerGram: string;
  unit: string;
  storageInstructions: string;
  grade: string;
  dietType: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  productPhotos: ProductPhoto[];
  discounts: Discount[];
}

interface CartItem {
  cartItemId: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  product: Product;
}

interface CheckoutItemPreviewProps {
  cartItems: CartItem[];
}

export default function CheckoutItemPreview({
  cartItems,
}: CheckoutItemPreviewProps) {
  // Helper fungsi untuk memformat angka string ke IDR murni
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full rounded-md border border-brand-mist-300 bg-background p-5 shadow-xs shadow-brand-mist-300/20 text-foreground">
      <h3 className="text-sm font-bold tracking-wide uppercase text-brand-mist-500 mb-4">
        Order Review ({cartItems?.length} items)
      </h3>

      <div className="flex flex-col divide-y divide-brand-mist-200">
        {cartItems?.map((item) => {
          const originalPrice = Number(item.product.price);
          const quantity = item.quantity;

          const activeDiscount = item.product.discounts?.[0];
          const hasDiscount = !!activeDiscount;
          const discountPercentage = hasDiscount
            ? Number(activeDiscount.discountAmount)
            : 0;

          const finalPricePerUnit = hasDiscount
            ? originalPrice - (originalPrice * discountPercentage) / 100
            : originalPrice;

          const totalOriginalPrice = originalPrice * quantity;
          const totalFinalPrice = finalPricePerUnit * quantity;

          return (
            <div
              key={item?.cartItemId}
              className="flex gap-4 py-4 first:pt-0 last:pb-0 items-start sm:items-center">
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-brand-mist-100 border border-brand-mist-200 shrink-0">
                <Image
                  src={
                    item?.product?.productPhotos?.[0]?.photoUrl ||
                    "/placeholder-img.png" // fixme
                  }
                  alt={item?.product?.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h4 className="text-sm font-bold text-brand-mist-800 truncate">
                    {item?.product?.name}
                  </h4>
                  {hasDiscount && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-brand-emerald-200/40 text-brand-emerald-700 dark:bg-brand-emerald-200 dark:text-brand-emerald-800">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs text-brand-mist-500 font-medium">
                  {quantity}x • {item?.product?.weightPerGram}
                  {item?.product?.unit.toLowerCase()} • Grade{" "}
                  {item?.product?.grade}
                </p>

                {item?.product?.dietType && (
                  <span className="inline-block text-[9px] font-bold tracking-wider uppercase text-brand-mist-400">
                    {item?.product?.dietType}
                  </span>
                )}
              </div>

              <div className="text-right shrink-0 flex flex-col justify-center">
                {hasDiscount && (
                  <p className="text-xs text-brand-mist-400 line-through decoration-brand-mist-400 font-medium">
                    {formatIDR(totalOriginalPrice)}
                  </p>
                )}
                <p
                  className={`text-sm font-extrabold ${hasDiscount ? "text-brand-emerald-600 dark:text-brand-emerald-500" : "text-brand-mist-800"}`}>
                  {formatIDR(totalFinalPrice)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
