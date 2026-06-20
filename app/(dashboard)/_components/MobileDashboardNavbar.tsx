"use client";

import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import FreshoraLogoNoText from "./FreshoraLogoNoText";
import { useEffect, useRef, useState } from "react";
import NavbarOpenMenuList from "./NavbarOpenMenuList";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";

function MobileDashboardNavbar() {
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
  const navbarMenuWrapRef = useRef<HTMLDivElement>(null);

  const handleOpenNavbarMenu = () => {
    setIsNavbarMenuOpen((open) => !open);
  };

  const { avatar, firstName, lastName } = useAuthStore((state) => state);

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
    <div className="relative">
      <nav className="flex px-8 justify-between items-center py-2 sm:hidden h-18 w-full sticky border-b border-brand-mist-300">
        <FreshoraLogoNoText />
        <div onClick={handleOpenNavbarMenu} className="cursor-pointer">
          <RiMenu3Fill className="text-2xl text-brand-mist-500" />
        </div>

        {isNavbarMenuOpen ? (
          <div
            ref={navbarMenuWrapRef}
            className="absolute w-full left-0 top-0  border-brand-emerald-200 bg-brand-mist-200 pb-8 px-5">
            <div
              onClick={handleOpenNavbarMenu}
              className="cursor-pointer flex justify-end py-4">
              <IoClose className="text-3xl text-brand-mist-500" />
            </div>
            <NavbarOpenMenuList onOpenNavbarMenu={handleOpenNavbarMenu} />
          </div>
        ) : null}
      </nav>
    </div>
  );
}

export default MobileDashboardNavbar;
