"use client";

import { Loader2, ShoppingCart } from "lucide-react";

interface CartButtonProps {
  isOutOfStock: boolean;
  isAddingToCart: boolean;
  onClick: () => void;
}

function CartButton({
  isOutOfStock,
  isAddingToCart,
  onClick,
}: CartButtonProps) {
  const getButtonContent = () => {
    if (isAddingToCart) {
      return {
        icon: <Loader2 className="w-5 h-5 animate-spin" />,
        text: "Adding...",
        ariaLabel: "Adding item to cart",
      };
    }

    if (isOutOfStock) {
      return {
        icon: (
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
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            <line x1="2" x2="22" y1="2" y2="22" strokeLinecap="round" />
          </svg>
        ),
        text: "Out of Stock",
        ariaLabel: "Product is out of stock",
      };
    }

    return {
      icon: <ShoppingCart className="w-5 h-5" />,
      text: "Add to Cart",
      ariaLabel: "Add item to cart",
    };
  };

  const { icon, text, ariaLabel } = getButtonContent();

  return (
    <button
      type="button"
      disabled={isOutOfStock || isAddingToCart}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`w-full h-14 md:h-16 flex items-center justify-center gap-3 px-6 rounded-2xl text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 ${
        isOutOfStock
          ? "bg-brand-mist-400 text-brand-mist-100 cursor-not-allowed"
          : "bg-gradient-to-r from-brand-emerald-700 to-brand-emerald-600 text-white hover:from-brand-emerald-800 hover:to-brand-emerald-700"
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

export default CartButton;
