import Image from "next/image";
import authBanner from "@/public/auth/auth-banner.jpg";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh">
      <div className="hidden md:block relative h-full w-[50%]">
        <Image
          src={authBanner}
          fill
          alt="auth-banner-grocery-official"
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-[50%]">{children}</div>
    </div>
  );
}

export default layout;
