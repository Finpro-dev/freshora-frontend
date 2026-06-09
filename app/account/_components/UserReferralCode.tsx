interface UserReferralCodeProps {
  myReferralCode: string;
}

function UserReferralCode({ myReferralCode }: UserReferralCodeProps) {
  return (
    <div className="px-5 py-5 w-full sm:w-[50%] border border-brand-mist-100 rounded-sm shadow-sm shadow-brand-mist-300">
      <div className="mb-5">
        <h3>Your referral code</h3>
        <p className="text-xs text-brand-mist-500">
          Share this code to your friend
        </p>
      </div>
      <p className="text-brand-mist-600 font-large text-lg sm:text-xl md:text-2xl">
        {myReferralCode}
      </p>
    </div>
  );
}

export default UserReferralCode;
