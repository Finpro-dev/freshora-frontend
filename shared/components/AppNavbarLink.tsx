"use client";

import { appNavbarStaticMenus } from "../statics/app-navbar-static";
import Link from "next/link";

interface AppNavbarLinkProps {
  children: React.ReactNode;
}

function AppNavbarLink({ children }: AppNavbarLinkProps) {
  return (
    <div className="flex gap-5 sm:gap-10 md:gap-12 items-center">
      {appNavbarStaticMenus?.map((link) => (
        <Link key={link.id} href={link.href}>
          {link.logo}
        </Link>
      ))}
      <div>{children}</div>
    </div>
  );
}

export default AppNavbarLink;
