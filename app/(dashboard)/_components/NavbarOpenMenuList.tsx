"use client";

import { usePathname } from "next/navigation";
import { sidebarDashboardMenu } from "../_statics/sidebar-menu-static";
import Link from "next/link";

interface NavbarOpenMenuListProps {
  onOpenNavbarMenu: () => void;
}

function NavbarOpenMenuList({ onOpenNavbarMenu }: NavbarOpenMenuListProps) {
  const pathName = usePathname();
  return (
    <nav className="flex flex-col">
      {sidebarDashboardMenu?.map((menu, index) => (
        <Link
          onClick={onOpenNavbarMenu}
          href={menu.href}
          key={index}
          className={`${pathName === menu.href && "bg-brand-emerald-200/20 rounded-lg text-brand-emerald-700"} flex gap-3 py-2 px-5 hover:bg-brand-emerald-200/30 hover:text-brand-emerald-700 hover:rounded-lg transition-all duration-150`}>
          <div className="relative text-xl">{menu.logo}</div>
          <div className="text-base">
            <p>{menu.name}</p>
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default NavbarOpenMenuList;
