import { Product } from "./product-type";

export interface ProductStockDiscount {
  quantity: number;
  storeId: string;
  product: Product;
}
