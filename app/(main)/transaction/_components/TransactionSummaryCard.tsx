"use client";

import { useState, useTransition } from "react";
import Button from "@/shared/components/Button";
import { CreateTransaction } from "../_types/create-transaction";
import { Address } from "@/shared/types/address-type";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { createTransaction } from "@/actions/create-transaction";
import { useRouter } from "next/navigation";

interface Discount {
  discountAmount: string;
}

interface Product {
  price: string;
  discounts: Discount[];
}

interface CartItem {
  cartItemId: string;
  quantity: number;
  product: Product;
}

interface ReferralVoucher {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  transactionId: string | null;
  referralVoucherId: string;
  referralOwnerId: string;
  couponCode: string;
  discountAmount: string | number;
  validFrom: Date;
  validUntil: Date;
}

interface FreeShippingVoucher {
  freeShippingVoucherId: string;
  userId: string;
  transactionId: string | null;
  currentTotalTransactions: number;
  createdAt: Date;
}

interface TransactionSummaryCardProps {
  cartItems: CartItem[];
  activeAddress: Address | null;
  activeCourier: string | null;
  shippingFee: number | undefined;
  isCalculateShippingFeeLoading: boolean;
  referralVoucher: ReferralVoucher | null;
  freeShippingVoucher: FreeShippingVoucher | null;
}

export default function TransactionSummaryCard({
  cartItems,
  activeAddress,
  activeCourier,
  shippingFee,
  isCalculateShippingFeeLoading,
  referralVoucher,
  freeShippingVoucher,
}: TransactionSummaryCardProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isVoucherApplied, setIsVoucherApplied] = useState<boolean>(false);
  const [isFreeShippingApplied, setIsFreeShippingApplied] =
    useState<boolean>(false);
  const isCheckoutPending = false;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  let subTotal = 0;
  let totalDiscount = 0;

  cartItems?.forEach((item) => {
    const qty = item?.quantity || 0;
    const price = Number(item?.product?.price) || 0;

    subTotal += price * qty;

    const activeDiscount = item?.product?.discounts?.[0];
    if (activeDiscount) {
      const discountPercentage = Number(activeDiscount?.discountAmount) || 0;
      totalDiscount += price * (discountPercentage / 100) * qty;
    }
  });

  const cleanProductSubtotal = subTotal - totalDiscount;

  const referralDiscountPercentage = referralVoucher
    ? Number(referralVoucher.discountAmount)
    : 0;
  const voucherDiscountAmount = isVoucherApplied
    ? cleanProductSubtotal * (referralDiscountPercentage / 100)
    : 0;

  const baseShippingFee = shippingFee || 0;

  const shippingDiscountAmount = isFreeShippingApplied ? baseShippingFee : 0;
  const finalShippingFee = Math.max(
    0,
    baseShippingFee - shippingDiscountAmount,
  );

  const grandTotal =
    Math.max(0, cleanProductSubtotal - voucherDiscountAmount) +
    finalShippingFee;

  const isShippingReady =
    !!activeAddress && !!activeCourier && shippingFee !== undefined;
  const isButtonDisabled = !isShippingReady || isCalculateShippingFeeLoading;

  const payloadCreateTransaction: CreateTransaction = {
    addressId: activeAddress?.addressId as string,
    courier: activeCourier as string,
    ...(freeShippingVoucher &&
      isFreeShippingApplied && {
        freeShippingVoucherId: freeShippingVoucher?.freeShippingVoucherId,
      }),
    ...(referralVoucher &&
      isVoucherApplied && {
        referralVoucherId: referralVoucher?.referralVoucherId,
      }),
  };

  const handleCreateTransaction = () => {
    Swal.fire({
      title: "Are you sure?",
      theme: "auto",
      text: "You won't be able to undo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007a55",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I confirmed it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await createTransaction(payloadCreateTransaction);

          if (!res?.success) {
            toast.error(res?.error);
          } else {
            toast.success("Order has been placed successfully");
            router.push("/");
          }
        });
      }
    });
  };

  return (
    <div className="w-full rounded-md border border-brand-mist-300 bg-color-background p-6 shadow-xs shadow-brand-mist-300/20 text-color-foreground space-y-6">
      <h3 className="text-sm font-bold tracking-wide text-brand-mist-500 border-b border-brand-mist-200 pb-3 select-none">
        Checkout summary
      </h3>

      {(referralVoucher || freeShippingVoucher) && (
        <div className="space-y-3">
          {referralVoucher && (
            <div className="p-3 rounded-md border border-brand-emerald-300/30 bg-brand-emerald-200/5 flex items-center justify-between">
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-brand-emerald-600 uppercase tracking-wider">
                  Referral Voucher ({referralDiscountPercentage}%)
                </span>
                <span className="text-xs font-mono font-bold text-brand-mist-700 truncate mt-0.5">
                  {referralVoucher.couponCode}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsVoucherApplied(!isVoucherApplied)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  isVoucherApplied
                    ? "bg-brand-emerald-600"
                    : "bg-brand-mist-300"
                }`}>
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ${isVoucherApplied ? "translate-x-4" : "translate-x-0"}`}
                />
              </button>
            </div>
          )}

          {freeShippingVoucher && (
            <div className="p-3 rounded-md border border-indigo-300/30 bg-indigo-500/5 flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Free Shipping Reward
                </span>
                <span className="text-xs font-medium text-brand-mist-500 truncate mt-0.5">
                  Your-{freeShippingVoucher.currentTotalTransactions}{" "}
                  transaction gift!
                </span>
              </div>
              <button
                type="button"
                disabled={!shippingFee}
                onClick={() => setIsFreeShippingApplied(!isFreeShippingApplied)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  !shippingFee
                    ? "opacity-40 cursor-not-allowed bg-brand-mist-300"
                    : isFreeShippingApplied
                      ? "bg-brand-emerald-600"
                      : "bg-brand-mist-300"
                }`}>
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ${isFreeShippingApplied ? "translate-x-4" : "translate-x-0"}`}
                />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3.5 text-sm">
        {/* sub total */}
        <div className="flex justify-between text-brand-mist-600 font-medium">
          <span>Subtotal ({cartItems?.length} product)</span>
          <span className="text-brand-mist-800 font-bold">
            {formatIDR(subTotal)}
          </span>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between text-red-500 font-semibold">
            <span>Total product discount</span>
            <span>-{formatIDR(totalDiscount)}</span>
          </div>
        )}

        {isVoucherApplied && (
          <div className="flex justify-between text-brand-emerald-600 dark:text-brand-emerald-400 font-bold animate-in fade-in duration-150">
            <span>Referral discount ({referralVoucher?.couponCode})</span>
            <span>-{formatIDR(voucherDiscountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-brand-mist-600 font-medium pt-2 border-t border-dashed border-brand-mist-200">
          <span>Shipping fee</span>

          {isCalculateShippingFeeLoading ? (
            <div className="w-20 h-4 bg-brand-mist-200 animate-pulse rounded-sm" />
          ) : !activeAddress ? (
            <span className="text-xs italic text-brand-mist-400 font-normal">
              Address has not been selected
            </span>
          ) : !activeCourier ? (
            <span className="text-xs italic text-brand-mist-400 font-normal">
              Courier has not been selected
            </span>
          ) : (
            <div className="flex flex-col items-end">
              {isFreeShippingApplied ? (
                <>
                  <span className="text-xs text-brand-mist-400 line-through font-normal">
                    {formatIDR(baseShippingFee)}
                  </span>
                  <span className="text-brand-emerald-600 font-bold uppercase tracking-wider text-[11px] mt-0.5">
                    Free Shipping fee
                  </span>
                </>
              ) : (
                <span className="text-brand-mist-800 font-bold">
                  {formatIDR(baseShippingFee)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-brand-mist-200 pt-4 flex justify-between items-center">
        <span className="text-base font-bold text-brand-mist-800">
          Grand Total
        </span>
        <span className="text-xl font-extrabold text-brand-mist-600 tracking-tight">
          {formatIDR(grandTotal)}
        </span>
      </div>

      {/* pay button */}
      <form action={handleCreateTransaction}>
        <Button btnType="primary" type="submit" disabled={isButtonDisabled}>
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Processing transaction...</span>
            </div>
          ) : !activeAddress ? (
            "Select the address first"
          ) : !activeCourier ? (
            "Select the courier first"
          ) : (
            "Pay now"
          )}
        </Button>
      </form>
    </div>
  );
}
