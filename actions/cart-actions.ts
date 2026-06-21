"use server";

import { cookies } from "next/headers";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { AddToCartInput, CartCount, CartData, UpdateCartInput } from "@/shared/types/cart-type";

const BASE_URL = CORS_CREDENTIALS.API_BASE_URL;

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const cookieString = [
    accessToken ? `accessToken=${accessToken}` : "",
    refreshToken ? `refreshToken=${refreshToken}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  if (cookieString) {
    headers["Cookie"] = cookieString;
  }

  return headers;
}

export async function getCartCount(): Promise<CartCount> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/cart/count`, {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      return { totalQuantity: 0 };
    }

    const data = await response.json();
    return data.data;
  } catch {
    return { totalQuantity: 0 };
  }
}

export async function getCartItems(
  page = 1,
  limit = 10
): Promise<CartData | null> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/cart?page=${page}&limit=${limit}`, {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch {
    return null;
  }
}

export async function addToCart(
  data: AddToCartInput
): Promise<{ success: boolean; message: string }> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/cart/items`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || "Failed to add to cart" };
    }

    return { success: true, message: "Item added to cart" };
  } catch {
    return { success: false, message: "Failed to add to cart" };
  }
}

export async function updateCartItem(
  cartItemId: string,
  data: UpdateCartInput
): Promise<{ success: boolean; message: string }> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.message || "Failed to update cart" };
    }

    return { success: true, message: "Cart updated" };
  } catch {
    return { success: false, message: "Failed to update cart" };
  }
}

export async function removeCartItem(
  cartItemId: string
): Promise<{ success: boolean; message: string }> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
      method: "DELETE",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      const result = await response.json();
      return {
        success: false,
        message: result.message || "Failed to remove item",
      };
    }

    return { success: true, message: "Item removed" };
  } catch {
    return { success: false, message: "Failed to remove item" };
  }
}
