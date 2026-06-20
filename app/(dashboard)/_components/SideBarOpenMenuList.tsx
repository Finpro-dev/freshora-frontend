"use client";

import Link from "next/link";
import { sidebarDashboardMenu } from "../_statics/sidebar-menu-static";
import { usePathname } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";
import DashboardProfile from "./UserAvatar";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { capitalize } from "@/shared/utils/capitalize";
import { ROLE_MAPPING } from "../_utils/role-mapping-util";
import Button from "@/shared/components/Button";
import { MdOutlineLogout } from "react-icons/md";
import LogoutButton from "@/app/(main)/account/_components/LogoutButton";

interface SideBarOpenMenuListProps {
  isSidebarOpen: boolean;
}

function SideBarOpenMenuList({ isSidebarOpen }: SideBarOpenMenuListProps) {
  const pathName = usePathname();
  const { avatar, firstName, lastName, role } = useAuthStore((state) => state);
  return (
    <>
      <div className="h-full">
        <nav className="flex flex-col px-2">
          {sidebarDashboardMenu?.map((menu, index) => (
            <Link
              href={menu.href}
              key={index}
              className={`${pathName === menu.href && "bg-brand-emerald-200/20 rounded-lg text-brand-emerald-700"} flex gap-0 ${isSidebarOpen && "md:gap-3"} py-2 px-5 hover:bg-brand-emerald-200/30 hover:text-brand-emerald-700 hover:rounded-lg transition-all duration-150`}>
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
      </div>

      <section className="py-5 flex flex-col gap-5">
        <div className={`flex justify-start items-center px-7 gap-3`}>
          <DashboardProfile avatar={avatar} isSideBarOpen={isSidebarOpen} />
          {isSidebarOpen ? (
            <div className="hidden md:block">
              <p>
                {capitalize(firstName)} {capitalize(lastName)}
              </p>
              <p className="text-xs text-brand-mist-500">
                {ROLE_MAPPING[role]}
              </p>
            </div>
          ) : null}
        </div>

        <div className="px-5">
          <LogoutButton>
            <span className={`pr-2 text-base`}>
              <MdOutlineLogout />
            </span>
            <span
              className={`${!isSidebarOpen ? "hidden" : "hidden md:block"}`}>
              Logout
            </span>
          </LogoutButton>
        </div>
      </section>
    </>
  );
}

export default SideBarOpenMenuList;
