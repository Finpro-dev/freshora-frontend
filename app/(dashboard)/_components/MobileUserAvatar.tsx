import Image from "next/image";
import defaultProfileImage from "@/public/user/default-user-profile.png";

interface MobileUserAvatarProps {
  avatar: string | null;
  height?: number;
  width?: number;
}
function MobileUserAvatar({
  avatar,
  height = 8,
  width = 8,
}: MobileUserAvatarProps) {
  return (
    <div
      className={`relative h-${height} w-${width} border-2 rounded-full border-mist-200 ring-3 ring-brand-emerald-700 overflow-hidden`}>
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

export default MobileUserAvatar;
