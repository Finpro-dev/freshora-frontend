interface UserReferralVoucherProps {
  voucherCode: string;
  validUntil: string;
}

function UserReferralVoucher({
  voucherCode,
  validUntil,
}: UserReferralVoucherProps) {
  return (
    <div className="px-5 py-5 w-full sm:w-[50%] border-2 border-dashed  border-brand-emerald-300 rounded-sm shadow-sm shadow-brand-mist-300">
      <div className="mb-5">
        <h3>Referral Coupon</h3>
        <p className="text-xs text-brand-mist-500">
          A coupon you received for joining via a referral code.
        </p>
      </div>
      <div>
        <p className="text-brand-mist-600 font-large text-xl sm:text-2xl md:text-3xl">
          {voucherCode}
        </p>
        <p className="text-xs text-brand-mist-400">Valid until {validUntil}</p>
      </div>
    </div>
  );
}

export default UserReferralVoucher;
