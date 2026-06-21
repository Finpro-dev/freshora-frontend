import { createStore } from "zustand";

export type CartStates = {
  totalQuantity: number;
  cartId: string;
  isLoading: boolean;
};

export type CartActions = {
  setTotalQuantity: (quantity: number) => void;
  setCartId: (cartId: string) => void;
  setIsLoading: (loading: boolean) => void;
  incrementQuantity: (amount: number) => void;
  decrementQuantity: (amount: number) => void;
  clearCart: () => void;
};

export const defaultCartState: CartStates = {
  totalQuantity: 0,
  cartId: "",
  isLoading: false,
};

export type CartStoreType = CartStates & CartActions;

export const createCartStore = (initState: CartStates = defaultCartState) => {
  return createStore<CartStoreType>()((set) => ({
    ...initState,
    setTotalQuantity: (quantity) => set({ totalQuantity: quantity }),
    setCartId: (cartId) => set({ cartId }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    incrementQuantity: (amount) =>
      set((state) => ({ totalQuantity: state.totalQuantity + amount })),
    decrementQuantity: (amount) =>
      set((state) => ({
        totalQuantity: Math.max(0, state.totalQuantity - amount),
      })),
    clearCart: () => set({ totalQuantity: 0, cartId: "" }),
  }));
};
