import Link from "next/link";
import { appNavbarNavigationMenu } from "../statics/app-navbar-navigation-menu-static";

function NavigationMenu() {
  return (
    <div className="hidden md:flex items-center text-brand-mist-600 text-sm lg:text-base">
      {appNavbarNavigationMenu?.map((menu, i: number) => (
        <Link
          key={i}
          href={menu.link}
          className="hover:text-brand-emerald-600 hover:bg-brand-mist-300/30 px-2.5 py-2.5 rounded-md transition-all duration-300">
          {menu.name}
        </Link>
      ))}
    </div>
  );
}

export default NavigationMenu;
