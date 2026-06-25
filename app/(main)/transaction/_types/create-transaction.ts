export interface CreateTransaction {
  addressId: string;
  courier: string;
  referralVoucherId?: string | undefined;
  freeShippingVoucherId?: string | undefined;
}
