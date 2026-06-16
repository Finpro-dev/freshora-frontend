"use client";

import { useGetCartItems } from "@/shared/hooks/use-cart";
import CartItemCard from "./_components/CartItemCard";
import CartSummary from "./_components/CartSummary";
import Spinner from "@/shared/components/Spinner";
import { BsCart4 } from "react-icons/bs";
import Link from "next/link";
import Button from "@/shared/components/Button";

function CartPage() {
  const { data: cartData, isLoading, isError } = useGetCartItems(1, 100);

  if (isLoading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-brand-mist-600">Failed to load cart. Please try again.</p>
        <Link href="/cart">
          <Button btnType="primary">Retry</Button>
        </Link>
      </div>
    );
  }

  const cartItems = cartData?.cartItems || [];
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-dvh bg-brand-mist-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-mist-900 mb-6">
          Shopping Cart
        </h1>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-brand-mist-100 rounded-lg border border-brand-mist-300/50">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-brand-mist-200 mb-4">
              <BsCart4 className="text-4xl text-brand-mist-400" />
            </div>
            <h2 className="text-xl font-semibold text-brand-mist-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-brand-mist-600 mb-6 text-center max-w-md">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/">
              <Button btnType="primary">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemCard key={item.cartItemId} item={item} />
              ))}
            </div>

            <div className="lg:col-span-1">
              <CartSummary items={cartItems} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
