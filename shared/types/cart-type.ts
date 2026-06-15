export interface ProductPhoto {
  photoUrl: string;
}

export interface Product {
  productId: string;
  name: string;
  price: number;
  productPhotos: ProductPhoto[];
}

export interface CartItem {
  cartItemId: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface CartData {
  cartId: string;
  cartItems: CartItem[];
  pagination: CartPagination;
}

export interface CartCount {
  totalQuantity: number;
}

export interface AddToCartInput {
  productId: string;
  storeId?: string;
  quantity: number;
  latitude?: number;
  longitude?: number;
}

export interface UpdateCartInput {
  quantity: number;
  operation: "set" | "increase" | "decrease";
}
