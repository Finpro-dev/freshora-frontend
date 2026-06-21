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
        <div className="absolute h-full w-full bg-linear-to-tr from-brand-emerald-800/60 to-brand-mist-200/10"></div>
      </div>
      <div className="w-full md:w-[50%] bg-linear-to-tl from-brand-emerald-800 to-brand-mist-200/20">
        {children}
      </div>
    </div>
  );
}

export default layout;
