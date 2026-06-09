export interface referralVoucher {
  couponCode: string;
  discountAmount: string;
  referralVoucherId: string;
  transactionId: string | null;
  userId: string;
  validFrom: string;
  validUntil: string;
}
