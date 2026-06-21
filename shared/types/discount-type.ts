export type DiscountType =
  | "BUY_ONE_GET_ONE"
  | "MIN_TRANSACTION"
  | "NO_REQUIREMENT";

export interface Discount {
  discountId: string;
  productId: string;
  type: DiscountType;
  minTransaction: string | null;
  validUntil: string;
  validFrom: string;
  discountAmount: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
