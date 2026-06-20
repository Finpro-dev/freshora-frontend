"use client";

import Link from "next/link";
import { sidebarDashboardMenu } from "../_statics/sidebar-menu-static";
import { usePathname } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";

interface SideBarOpenMenuListProps {
  isSidebarOpen: boolean;
}

function SideBarOpenMenuList({ isSidebarOpen }: SideBarOpenMenuListProps) {
  const pathName = usePathname();
  return (
    <nav className="flex flex-col px-2">
      {sidebarDashboardMenu?.map((menu, index) => (
        <Link
          href={menu.href}
          key={index}
          className={`${pathName === menu.href && "bg-brand-emerald-200/20 rounded-lg text-brand-emerald-700"} flex gap-3 py-2 px-5 hover:bg-brand-emerald-200/30 hover:text-brand-emerald-700 hover:rounded-lg transition-all duration-150`}>
          <div className="hidden md:block">
            {isSidebarOpen ? (
              <div className="relative text-xl">{menu.logo}</div>
            ) : (
              <Tooltip title={menu.name} arrow placement="right-start">
                <div className="relative text-xl">{menu.logo}</div>
              </Tooltip>
            )}
          </div>

          <div className="block md:hidden">
            <Tooltip title={menu.name} arrow placement="right-start">
              <div className="relative text-xl">{menu.logo}</div>
            </Tooltip>
          </div>
          {isSidebarOpen && (
            <div className="hidden md:block text-base">
              <p>{menu.name}</p>
            </div>
          )}
        </Link>
      ))}
    </nav>
  );
}

export default SideBarOpenMenuList;
