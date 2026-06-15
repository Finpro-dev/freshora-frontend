"use client";

import { CartItem } from "@/shared/types/cart-type";
import Button from "@/shared/components/Button";
import Link from "next/link";

interface CartSummaryProps {
  items: CartItem[];
}

function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-brand-mist-100 rounded-lg shadow-sm border border-brand-mist-300/50 p-6 h-fit sticky top-24">
      <h2 className="text-xl font-bold text-brand-mist-900 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-brand-mist-700">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-brand-mist-700">
          <span>Shipping</span>
          <span className="text-brand-emerald-600 font-medium">Calculated at checkout</span>
        </div>
      </div>

      <div className="border-t border-brand-mist-300 pt-4 mb-6">
        <div className="flex justify-between text-lg font-bold text-brand-mist-900">
          <span>Total</span>
          <span className="text-brand-emerald-700">{formatPrice(subtotal)}</span>
        </div>
      </div>

      <Link href="/checkout">
        <Button btnType="primary" disabled={items.length === 0}>
          Proceed to Checkout
        </Button>
      </Link>

      <Link href="/" className="block mt-3">
        <Button btnType="secondary">Continue Shopping</Button>
      </Link>
    </div>
  );
}

export default CartSummary;
