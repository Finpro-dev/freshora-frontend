"use client";

import Image from "next/image";
import { CartItem } from "@/shared/types/cart-type";
import { useUpdateCartItem, useRemoveCartItem } from "@/shared/hooks/use-cart";
import { IoAdd, IoRemove, IoTrash } from "react-icons/io5";
import { useRef, useState } from "react";
import { CLICK_DEBOUNCE_MS } from "../../_statics/cart-click-debounce-static";

interface CartItemCardProps {
  item: CartItem;
}

function CartItemCard({ item }: CartItemCardProps) {
  const lastAddToCartAtRef = useRef(0);
  const updateCart = useUpdateCartItem();
  const removeCart = useRemoveCartItem();
  const [isUpdating, setIsUpdating] = useState(false);

  const productPhotos = item.product.productPhotos || [];
  const firstPhoto = productPhotos[0];
  const productPhoto =
    firstPhoto &&
    firstPhoto.photoUrl &&
    String(firstPhoto.photoUrl).trim() !== "" &&
    firstPhoto.photoUrl !== "null" &&
    !firstPhoto.photoUrl.includes("null")
      ? firstPhoto.photoUrl
      : "/logo.png";

  const handleIncrement = async () => {
    const now = Date.now();
    if (now - lastAddToCartAtRef.current < CLICK_DEBOUNCE_MS) return;
    lastAddToCartAtRef.current = now;

    setIsUpdating(true);
    await updateCart.mutateAsync({
      cartItemId: item.cartItemId,
      data: { quantity: 1, operation: "increase" },
    });
    setIsUpdating(false);
  };

  const handleDecrement = async () => {
    if (item.quantity <= 1) {
      return;
    }

    const now = Date.now();
    if (now - lastAddToCartAtRef.current < CLICK_DEBOUNCE_MS) return;
    lastAddToCartAtRef.current = now;

    setIsUpdating(true);
    await updateCart.mutateAsync({
      cartItemId: item.cartItemId,
      data: { quantity: 1, operation: "decrease" },
    });
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    await removeCart.mutateAsync(item.cartItemId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const itemPrice = item.product.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-brand-mist-100 rounded-lg shadow-sm border border-brand-mist-300/50 hover:shadow-md transition-all duration-200">
      <div className="relative w-full sm:w-32 h-32 shrink-0">
        <Image
          src={productPhoto}
          alt={item.product.name}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 640px) 100vw, 128px"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-brand-mist-900 line-clamp-2 pr-4">
          {item.product.name}
        </h3>

        <p className="text-sm text-brand-mist-600">
          {formatPrice(item.product.price)} x {item.quantity}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              disabled={isUpdating || item.quantity <= 1}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-mist-200 text-brand-emerald-700 hover:bg-brand-emerald-600 hover:text-brand-mist-200 hover:shadow-md hover:shadow-brand-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              aria-label="Decrease quantity">
              <IoRemove className="text-base" />
            </button>
            <span className="w-12 text-center font-semibold text-brand-mist-900 text-base">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={isUpdating}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-mist-200 text-brand-emerald-700 hover:bg-brand-emerald-600 hover:text-brand-mist-200 hover:shadow-md hover:shadow-brand-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              aria-label="Increase quantity">
              <IoAdd className="text-base" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-brand-mist-600">Subtotal</span>
            <span className="text-lg font-bold text-brand-emerald-700">
              {formatPrice(itemPrice)}
            </span>
            <button
              onClick={handleRemove}
              disabled={removeCart.isPending}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              aria-label="Remove item">
              <IoTrash className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
