"use client";

import { usePathname } from "next/navigation";
import { appNavbarStaticMenus } from "../statics/app-navbar-static";
import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";

function AppNavbarLink() {
  const path = usePathname();

  return (
    <div className="flex gap-5 sm:gap-10 md:gap-12 items-center">
      {appNavbarStaticMenus?.map((link) => (
        <Link key={link.id} href={link.href}>
          {link.logo}
        </Link>
      ))}
      <Link
        href="/profile"
        className="relative w-8 sm:w-10 h-8 sm:h-10 border-2 rounded-full border-brand-mist-100 ring-3 ring-brand-emerald-700">
        <Image
          src={logo}
          alt="Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </Link>
    </div>
  );
}

export default AppNavbarLink;
