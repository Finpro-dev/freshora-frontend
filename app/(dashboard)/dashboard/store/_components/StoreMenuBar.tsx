"use client";

import Link from "next/link";
import { STORE_MENU_STATIC } from "../_statics/store-menu-static";
import { usePathname } from "next/navigation";

function StoreMenuBar() {
  const pathName = usePathname();
  return (
    <div className="flex items-end py-5 w-full border-y border-brand-mist-300 fixed sm:sticky top-5 h-30 sm:h-auto sm:top-0 z-10 bg-white dark:bg-black">
      <div className="flex justify-center w-full">
        <div>
          {STORE_MENU_STATIC?.map((menu, index: number) => {
            const isActive = menu.href === pathName;
            return (
              <Link
                key={index}
                href={menu.href}
                className={`px-5 py-2 ${isActive && "bg-brand-emerald-200/20 text-brand-emerald-700"} rounded-xl`}>
                {menu.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StoreMenuBar;
