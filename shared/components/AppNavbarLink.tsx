"use client";

import { usePathname } from "next/navigation";
import { appNavbarStaticMenus } from "../statics/app-navbar-static";
import Link from "next/link";
import { showSearchbarChecker } from "../utils/show-searchbar-checker-util";
import { useCartStore } from "../store/cart-store/CartStoreProvider";
import { useEffect } from "react";
import { useGetCartCount } from "@/shared/hooks/use-cart";

interface AppNavbarLinkProps {
  children: React.ReactNode;
}

function AppNavbarLink({ children }: AppNavbarLinkProps) {
  const currentPath = usePathname();
  const isShowSearchBar = showSearchbarChecker(currentPath);
  const totalQuantity = useCartStore((state) => state.totalQuantity);
  const setTotalQuantity = useCartStore((state) => state.setTotalQuantity);
  const { data, isSuccess } = useGetCartCount();

  useEffect(() => {
    if (isSuccess && data) {
      setTotalQuantity(data.totalQuantity);
    }
  }, [isSuccess, data, setTotalQuantity]);

  return (
    <div
      className={`${!isShowSearchBar && "w-full justify-between"} sm:w-auto flex justify gap-5 sm:gap-10 md:gap-12 items-center`}>
      {appNavbarStaticMenus?.map((link) => {
        if (link.name === "cart") {
          return (
            <Link
              key={link.id}
              href={link.href}
              className="relative flex items-center justify-center p-2 text-brand-emerald-700 hover:text-brand-emerald-800 transition-colors duration-200"
              aria-label={`Shopping cart with ${totalQuantity} items`}>
              {link.logo}
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center bg-brand-emerald-600 text-brand-mist-200 text-xs font-semibold rounded-full px-1.5 shadow-sm animate-in zoom-in-50 duration-200">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </Link>
          );
        }
        return (
          <Link key={link.id} href={link.href}>
            {link.logo}
          </Link>
        );
      })}
      <div>{children}</div>
    </div>
  );
}

export default AppNavbarLink;
