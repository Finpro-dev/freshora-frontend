"use client";

import LogoutButton from "@/app/(main)/account/_components/LogoutButton";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { capitalize } from "@/shared/utils/capitalize";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { sidebarDashboardMenu } from "../_statics/sidebar-menu-static";
import { ROLE_MAPPING } from "../_utils/role-mapping-util";
import UserAvatar from "./UserAvatar";

interface SideBarOpenMenuListProps {
  isSidebarOpen: boolean;
}

function SideBarOpenMenuList({ isSidebarOpen }: SideBarOpenMenuListProps) {
  const pathName = usePathname();
  const { avatar, firstName, lastName, role } = useAuthStore((state) => state);

  // Split menu into main menu and external/footer links
  const mainMenu =
    sidebarDashboardMenu?.filter((item) => !item.isExternal) || [];
  const externalLinks =
    sidebarDashboardMenu?.filter((item) => item.isExternal) || [];

  return (
    <>
      <div className="h-full">
        <nav className="flex flex-col px-2">
          {mainMenu?.map((menu, index) => {
            const pathNameArr = pathName?.slice(1, pathName?.length).split("/");
            const menuArr = menu.href?.slice(1, menu.href?.length).split("/");
            let isActive = pathNameArr.at(1) === menuArr.at(1);

            return (
              <Link
                href={menu.href}
                key={index}
                className={`${isActive ? "bg-brand-emerald-200/20 rounded-lg text-brand-emerald-700" : ""} flex gap-0 ${isSidebarOpen && "md:gap-3"} py-2 px-5 hover:bg-brand-emerald-200/30 hover:text-brand-emerald-700 hover:rounded-lg transition-all duration-150`}
              >
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
                  <div className="hidden md:block text-base text-brand-mist-700">
                    <p>{menu.name}</p>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <section className="py-4 flex flex-col gap-3">
        {/* External Links - "Back to Store" */}
        {externalLinks?.length > 0 && (
          <div className="px-2 space-y-1">
            {externalLinks.map((link, index) => {
              const linkId = link.id || `external-${index}`;
              return (
                <Link
                  href={link.href}
                  key={linkId}
                  className="flex items-center gap-3 rounded-lg px-5 py-2.5 text-sm text-brand-mist-600 transition-all duration-150 hover:bg-brand-emerald-200/30 hover:text-brand-emerald-700 group border border-border"
                >
                  <div className="text-brand-mist-400 transition-colors duration-150 group-hover:text-brand-emerald-600">
                    {link.logo}
                  </div>
                  {isSidebarOpen && (
                    <p className="hidden md:block font-medium">{link.name}</p>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* User Profile Section */}
        <div className={`flex justify-start items-center px-7 gap-3`}>
          <UserAvatar avatar={avatar} isSideBarOpen={isSidebarOpen} />
          {isSidebarOpen ? (
            <div className="hidden md:block">
              <p className="text-brand-mist-800">
                {capitalize(firstName)} {capitalize(lastName)}
              </p>
              <p className="text-xs text-brand-mist-500">
                {ROLE_MAPPING[role]}
              </p>
            </div>
          ) : null}
        </div>

        {/* logout button */}
        <div className="px-5">
          <LogoutButton className="flex gap-2 items-center justify-center w-full bg-red-300/60 rounded-md hover:bg-red-900 hover:text-brand-mist-200 cursor-pointer transition-all duration-300 py-2">
            <span className={`pr-2 text-base`}>
              <MdOutlineLogout />
            </span>
            <span
              className={`${!isSidebarOpen ? "hidden" : "hidden md:block"}`}
            >
              Logout
            </span>
          </LogoutButton>
        </div>
      </section>
    </>
  );
}

export default SideBarOpenMenuList;
