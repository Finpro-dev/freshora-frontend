"use client";

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

interface FreeShippingVoucher {
  freeShippingVoucherId: string;
  userId: string;
  transactionId: string | null;
}

interface ReferralVoucher {
  referralVoucherId: string;
  couponCode: string;
  discountAmount: string | number; // Menangani tipe Decimal/String dari database
}

interface OrderSummaryCardProps {
  cartItems: CartItem[];
  freeShippingVoucher: FreeShippingVoucher | null | undefined;
  referralVoucher: ReferralVoucher | null;
  shippingCost: number; // Ongkir dari API RajaOngkir kamu
}

export default function OrderSummaryCard({
  cartItems,
  freeShippingVoucher,
  referralVoucher,
  shippingCost,
}: OrderSummaryCardProps) {
  // Helper formatting IDR Rupiah
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // ========================================================
  // KALKULASI BERLAPIS (KOTAK LOGIKA BISNIS)
  // ========================================================

  let totalOriginalProductsPrice = 0;
  let totalDirectProductsDiscount = 0;

  // 1. Hitung total harga barang & diskon langsung bawaan produk
  cartItems.forEach((item) => {
    const qty = item.quantity;
    const price = Number(item.product.price);

    totalOriginalProductsPrice += price * qty;

    const activeDiscount = item.product.discounts?.[0];
    if (activeDiscount) {
      const pct = Number(activeDiscount.discountAmount) / 100;
      totalDirectProductsDiscount += price * pct * qty;
    }
  });

  // Subtotal bersih produk setelah dipotong diskon langsung barang
  const subtotalProductsClean =
    totalOriginalProductsPrice - totalDirectProductsDiscount;

  // 2. Cek Voucher Gratis Ongkir (Jika ada, potongan = nilai ongkir penuh)
  const hasFreeShipping = !!freeShippingVoucher;
  const shippingDiscountAmount = hasFreeShipping ? shippingCost : 0;
  const finalShippingCostResult = Math.max(
    0,
    shippingCost - shippingDiscountAmount,
  );

  // 3. Cek Voucher Referral Pemilik
  const hasReferralVoucher = !!referralVoucher;
  const referralDiscountAmount = hasReferralVoucher
    ? Number(referralVoucher.discountAmount)
    : 0;

  // 4. Perhitungan Tagihan Akhir Mutlak (Grand Total)
  const grandTotalResult =
    Math.max(0, subtotalProductsClean - referralDiscountAmount) +
    finalShippingCostResult;

  return (
    <div className="w-full rounded-md border border-brand-mist-300 bg-background p-6 shadow-xs shadow-brand-mist-300/20 text-foreground space-y-6">
      <h3 className="text-sm font-bold tracking-wide uppercase text-brand-mist-500 border-b border-brand-mist-200 pb-3">
        Shopping Summary
      </h3>

      {/* Rincian List Kalkulasi Angka */}
      <div className="space-y-3.5 text-sm">
        {/* SUBTOTAL ASLI BARANG */}
        <div className="flex justify-between text-brand-mist-600 font-medium">
          <span>Total Harga ({cartItems.length} barang)</span>
          <span>{formatIDR(totalOriginalProductsPrice)}</span>
        </div>

        {/* DISKON BARANG (Hanya muncul kalau ada barang yang lagi diskon) */}
        {totalDirectProductsDiscount > 0 && (
          <div className="flex justify-between text-red-500 font-semibold animate-in fade-in duration-200">
            <span>Diskon Potongan Produk</span>
            <span>-{formatIDR(totalDirectProductsDiscount)}</span>
          </div>
        )}

        {/* SEPARATOR KHUSUS VOUCHER */}
        {(hasReferralVoucher || hasFreeShipping) && (
          <div className="border-t border-dashed border-brand-mist-300 my-2 pt-2" />
        )}

        {/* VOUCHER REFERRAL (Hanya muncul jika variable bernilai TRUTHY) */}
        {hasReferralVoucher && (
          <div className="flex justify-between items-center bg-brand-emerald-200/20 text-brand-emerald-700 dark:bg-brand-emerald-200/10 dark:text-brand-emerald-400 px-3 py-2 rounded-md animate-in slide-in-from-top-1 duration-200">
            <div className="flex flex-col">
              <span className="font-bold text-xs uppercase tracking-wider">
                Referral Code Coupon
              </span>
              <span className="text-[11px] opacity-80">
                Code: {referralVoucher.couponCode}
              </span>
            </div>
            <span className="font-extrabold text-sm">
              -{formatIDR(referralDiscountAmount)}
            </span>
          </div>
        )}

        {/* ONGKOS KIRIM DASAR RAJAONGKIR */}
        <div className="flex justify-between text-brand-mist-600 font-medium">
          <span>Biaya Pengiriman (Shipping)</span>
          <span
            className={
              hasFreeShipping && shippingCost > 0
                ? "line-through text-xs text-brand-mist-400"
                : ""
            }>
            {shippingCost > 0 ? formatIDR(shippingCost) : "Free"}
          </span>
        </div>

        {/* VOUCHER BEBAS ONGKIR (Hanya muncul jika variable bernilai TRUTHY) */}
        {hasFreeShipping && shippingCost > 0 && (
          <div className="flex justify-between items-center bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 px-3 py-2 rounded-md animate-in slide-in-from-top-1 duration-200">
            <span className="font-bold text-xs uppercase tracking-wider">
              Free Shipping Privilege
            </span>
            <span className="font-extrabold text-sm">
              -{formatIDR(shippingDiscountAmount)}
            </span>
          </div>
        )}
      </div>

      {/* SEPARATOR TOTAL AKHIR */}
      <div className="border-t border-brand-mist-200 pt-4 flex justify-between items-center">
        <span className="text-base font-bold text-brand-mist-800">
          Total Pembayaran
        </span>
        <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
          {formatIDR(grandTotalResult)}
        </span>
      </div>
    </div>
  );
}
