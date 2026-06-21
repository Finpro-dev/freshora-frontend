import { formatDate } from "@/shared/utils/date-formatter";

interface UserReferralVoucherProps {
  voucherCode: string;
  validUntil: string;
}

function UserReferralVoucher({
  voucherCode,
  validUntil,
}: UserReferralVoucherProps) {
  return (
    <div className="px-5 py-5 w-full sm:w-[50%] border-2 border-dashed  border-brand-emerald-200 rounded-sm shadow-sm shadow-brand-mist-300">
      <div className="mb-5">
        <h3>Referral Coupon</h3>
        <p className="text-xs text-brand-mist-500">
          A coupon you received for joining via a referral code.
        </p>
      </div>
      <div>
        <p className="text-brand-mist-600 font-large text-lg sm:text-xl md:text-2xl mb-1">
          {voucherCode}
        </p>
        <p className="text-xs text-brand-mist-400">
          Valid until {formatDate(validUntil)}
        </p>
      </div>
    </div>
  );
}

export default UserReferralVoucher;
