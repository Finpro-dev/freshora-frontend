import Button from "@/shared/components/Button";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

interface UserDetailsProps {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | undefined | null;
  isVerified: boolean;
}

async function UserDetails({
  avatar,
  firstName,
  lastName,
  email,
  phone,
  isVerified,
}: UserDetailsProps) {
  return (
    <div className="relative w-full flex justify-center gap-8 sm:gap-20 items-center px-5 py-5 rounded-sm shadow-sm shadow-brand-mist-300 border border-brand-mist-100">
      <div className="relative w-15 sm:w-30 h-15 sm:h-30 border-2 rounded-full border-brand-mist-200 ring-3 ring-brand-emerald-700 overflow-hidden">
        <Image
          src={avatar}
          alt="Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div>
        <h3 className="text-xl sm:text-3xl font-large mb-2 sm:mb-3">
          {firstName} {lastName}
        </h3>
        <div className="flex flex-col gap-2 sm:gap-3">
          <p className="text-xs sm:text-sm text-brand-mist-700 ">{email}</p>
          {phone && (
            <p className="text-xs sm:text-sm text-brand-mist-600 ">{phone}</p>
          )}
          <div className={isVerified ? "" : ""}>
            {isVerified ? (
              <div className="flex gap-2 items-center text-brand-emerald-500">
                <GiCheckMark />
                <span className="text-xs">Verified</span>
              </div>
            ) : (
              <div className="flex gap-2 items-center text-red-700">
                <RxCross2 />
                <span className="text-xs">Not verified</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
