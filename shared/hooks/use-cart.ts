"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios-instance";
import { AddToCartInput, CartCount, CartData, UpdateCartInput } from "@/shared/types/cart-type";
import { useCartStore } from "@/shared/store/cart-store/CartStoreProvider";
import { toast } from "sonner";

const CART_KEYS = {
  all: ["cart"] as const,
  count: () => [...CART_KEYS.all, "count"] as const,
  items: () => [...CART_KEYS.all, "items"] as const,
};

export const useGetCartCount = () => {
  return useQuery<CartCount>({
    queryKey: CART_KEYS.count(),
    queryFn: async () => {
      const response = await api.get<{ data: CartCount }>("/cart/count");
      return response.data.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetCartItems = (page = 1, limit = 10) => {
  return useQuery<CartData>({
    queryKey: [...CART_KEYS.items(), { page, limit }],
    queryFn: async () => {
      const response = await api.get<{ data: CartData }>("/cart", {
        params: { page, limit },
      });
      return response.data.data;
    },
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const setTotalQuantity = useCartStore((state) => state.setTotalQuantity);

  return useMutation({
    mutationFn: async (data: AddToCartInput) => {
      const response = await api.post("/cart/items", data);
      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.items() });
      // Refetch cart count to sync navbar in real-time
      const countData = await queryClient.fetchQuery<CartCount>({ queryKey: CART_KEYS.count() });
      if (countData) {
        setTotalQuantity(countData.totalQuantity);
      }
      toast.success("Item added to cart");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message =
        error.response?.data?.message || "Failed to add item to cart";
      toast.error(message);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const setTotalQuantity = useCartStore((state) => state.setTotalQuantity);

  return useMutation({
    mutationFn: async ({
      cartItemId,
      data,
    }: {
      cartItemId: string;
      data: UpdateCartInput;
    }) => {
      const response = await api.put(`/cart/items/${cartItemId}`, data);
      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.items() });
      // Refetch cart count to sync navbar in real-time
      const countData = await queryClient.fetchQuery<CartCount>({ queryKey: CART_KEYS.count() });
      if (countData) {
        setTotalQuantity(countData.totalQuantity);
      }
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message =
        error.response?.data?.message || "Failed to update cart item";
      toast.error(message);
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const setTotalQuantity = useCartStore((state) => state.setTotalQuantity);

  return useMutation({
    mutationFn: async (cartItemId: string) => {
      await api.delete(`/cart/items/${cartItemId}`);
    },
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: CART_KEYS.items() });
      const previousItems = queryClient.getQueryData(CART_KEYS.items());

      const cartData = queryClient.getQueryData<CartData>(CART_KEYS.items());
      if (cartData) {
        const item = cartData.cartItems.find(
          (i) => i.cartItemId === cartItemId
        );
        if (item) {
          decrementQuantity(item.quantity);
        }
      }

      return { previousItems };
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.items() });
      // Refetch cart count to sync navbar in real-time
      const countData = await queryClient.fetchQuery<CartCount>({ queryKey: CART_KEYS.count() });
      if (countData) {
        setTotalQuantity(countData.totalQuantity);
      }
      toast.success("Item removed from cart");
    },
    onError: (
      _error: { response?: { data?: { message?: string } } },
      _cartItemId,
      context
    ) => {
      if (context?.previousItems) {
        queryClient.setQueryData(CART_KEYS.items(), context.previousItems);
      }
      const message =
        _error.response?.data?.message || "Failed to remove cart item";
      toast.error(message);
    },
  });
};
