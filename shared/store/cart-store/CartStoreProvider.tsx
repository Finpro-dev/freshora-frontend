"use client";

import { createContext, useContext, useRef } from "react";
import { CartStates, CartStoreType, createCartStore } from "./cart-store";
import { useStore } from "zustand";

interface CartStoreProviderProps {
  children: React.ReactNode;
  initialCart: CartStates;
}

type CartStoreApi = ReturnType<typeof createCartStore>;

const CartStoreContext = createContext<CartStoreApi | null>(null);

function CartStoreProvider({ children, initialCart }: CartStoreProviderProps) {
  const cartRef = useRef<ReturnType<typeof createCartStore>>(null);

  if (!cartRef.current) {
    cartRef.current = createCartStore(initialCart);
  }

  return (
    <CartStoreContext.Provider value={cartRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
}

export const useCartStore = <T,>(selector: (store: CartStoreType) => T): T => {
  const cartStoreContext = useContext(CartStoreContext);
  if (!cartStoreContext) {
    throw new Error(`CartStoreContext must be used within CartStoreProvider`);
  }

  return useStore(cartStoreContext, selector);
};

export default CartStoreProvider;
