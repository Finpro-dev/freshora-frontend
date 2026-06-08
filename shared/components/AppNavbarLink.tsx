"use client";

import { usePathname } from "next/navigation";
import { appNavbarStaticMenus } from "../statics/app-navbar-static";
import Link from "next/link";
import { showSearchbarChecker } from "../utils/show-searchbar-checker-util";

interface AppNavbarLinkProps {
  children: React.ReactNode;
}

function AppNavbarLink({ children }: AppNavbarLinkProps) {
  const currentPath = usePathname();
  const isShowSearchBar = showSearchbarChecker(currentPath);
  return (
    <div
      className={`${!isShowSearchBar && "w-full justify-between"} sm:w-auto flex justify gap-5 sm:gap-10 md:gap-12 items-center`}>
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
