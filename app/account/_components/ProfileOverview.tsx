import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { ApiResponse } from "@/shared/types/api-type";
import { User } from "@/shared/types/user-type";

import defaultUserProfile from "@/public/user/default-user-profile.png";
import { cookies } from "next/headers";
import Image from "next/image";
import { getUserProfile } from "@/actions/profile-user";
import UserDetails from "./UserDetails";
import { getUserReferralVoucher } from "@/actions/referral-voucher-user";
import UserReferralVoucher from "./UserReferralVoucher";
import UserReferralCode from "./UserReferralCode";
import VerificationAlert from "./VerificationAlert";

async function ProfileOverview() {
  const [userData, userReferralVoucher] = await Promise.all([
    getUserProfile(),
    getUserReferralVoucher(),
  ]);
  const user = userData?.data;
  const referralVoucher = userReferralVoucher.data;
  const avatar = userData.data?.avatar || defaultUserProfile;

  return (
    <div>
      {/* user details */}
      <UserDetails
        firstName={user!.firstName}
        lastName={user!.lastName || ""}
        avatar={avatar as string}
        email={user!.email}
        phone={user?.phone}
        isVerified={user!.isVerified}
      />

      {/* verification alert */}
      {!user?.isVerified && <VerificationAlert email={user!.email as string} />}

      {/* referral sections */}
      <div className="flex flex-col sm:flex-row gap-5 mt-5 ">
        {/* my referral code */}
        <UserReferralCode myReferralCode={user!.myReferralCode} />

        {/* referral voucher */}
        {referralVoucher ? (
          <UserReferralVoucher
            voucherCode={referralVoucher!.couponCode}
            validUntil={referralVoucher!.validUntil}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ProfileOverview;
