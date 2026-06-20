import Image from "next/image";
import defaultProfileImage from "@/public/user/default-user-profile.png";

interface UserAvatarProps {
  avatar: string | null;
  isSideBarOpen: boolean;
}

function UserAvatar({ avatar, isSideBarOpen }: UserAvatarProps) {
  return (
    <div
      className={`relative ${isSideBarOpen ? "md:w-8 md:h-8" : "h-6 w-6"} h-6 w-6 border-2 rounded-full border-mist-200 ring-3 ring-brand-emerald-700 overflow-hidden`}>
      <Image
        src={avatar ?? defaultProfileImage}
        alt="User profile"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

export default UserAvatar;
