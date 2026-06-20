"use client";

import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import FreshoraLogoNoText from "./FreshoraLogoNoText";
import { useEffect, useRef, useState } from "react";
import NavbarOpenMenuList from "./NavbarOpenMenuList";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import UserAvatar from "./UserAvatar";
import { capitalize } from "@/shared/utils/capitalize";
import { ROLE_MAPPING } from "../_utils/role-mapping-util";
import MobileUserAvatar from "./MobileUserAvatar";
import LogoutButton from "@/app/(main)/account/_components/LogoutButton";

function MobileDashboardNavbar() {
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
  const navbarMenuWrapRef = useRef<HTMLDivElement>(null);

  const handleOpenNavbarMenu = () => {
    setIsNavbarMenuOpen((open) => !open);
  };

  const { avatar, firstName, lastName, role } = useAuthStore((state) => state);

  const handleCloseModal = (e: MouseEvent): void => {
    console.log(e.target);
    if (
      navbarMenuWrapRef.current &&
      !navbarMenuWrapRef.current?.contains(e.target as Node)
    ) {
      setIsNavbarMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseModal, true);
    return () => {
      document.removeEventListener("click", handleCloseModal, true);
    };
  }, [handleCloseModal, navbarMenuWrapRef]);

  return (
    <div className="sticky top-0 ">
      <nav className="relative flex px-8 justify-between items-center py-2 sm:hidden h-18 w-full border-b border-brand-mist-300">
        <FreshoraLogoNoText />
        <div onClick={handleOpenNavbarMenu} className="cursor-pointer">
          <RiMenu3Fill className="text-2xl text-brand-mist-500" />
        </div>

        {isNavbarMenuOpen ? (
          <div
            ref={navbarMenuWrapRef}
            className="absolute w-full left-0 top-0  border-brand-emerald-200 bg-brand-mist-200 pb-8 px-5">
            {/* close button */}
            <div
              onClick={handleOpenNavbarMenu}
              className="cursor-pointer flex justify-end py-4">
              <IoClose className="text-3xl text-brand-mist-500" />
            </div>

            {/* Profile */}
            <div className={`flex justify-start items-center px-5 py-4 gap-3`}>
              <MobileUserAvatar avatar={avatar} />
              <div>
                <p>
                  {capitalize(firstName)} {capitalize(lastName)}
                </p>
                <p className="text-xs text-brand-mist-500">
                  {ROLE_MAPPING[role]}
                </p>
              </div>
            </div>
            <NavbarOpenMenuList onOpenNavbarMenu={handleOpenNavbarMenu} />
            <LogoutButton className="mt-3 px-1 py-1 flex gap-2 items-center justify-center w-full bg-red-300/60 rounded-md hover:bg-red-900 hover:text-brand-mist-200 cursor-pointer transition-all duration-300">
              Logout
            </LogoutButton>
          </div>
        ) : null}
      </nav>
    </div>
  );
}

export default MobileDashboardNavbar;
