import Link from "next/link";
import { appNavbarMenuDropdown } from "../statics/app-navbar-menu-dropdown-static";
import { IoClose } from "react-icons/io5";
import LogoutButton from "@/app/(main)/account/_components/LogoutButton";
import { LuLayoutDashboard } from "react-icons/lu";

interface AppNavbarMenuDropdownProps {
  onCloseModal: () => void;
  isAdmin?: boolean;
}

function AppNavbarMenuDropdown({
  onCloseModal,
  isAdmin = false,
}: AppNavbarMenuDropdownProps) {
  return (
    <div className="absolute sm:right-5 -right-1 sm:top-5 -top-1 z-101 w-75 rounded-md border border-brand-mist-300 bg-brand-mist-100 px-1.5 py-10 md:px-1.5 md:py-1.5 shadow-sm shadow-brand-mist-300/50 ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="relative">
        {isAdmin && (
          <ul className="flex flex-col gap-0.5">
            <li>
              <Link
                onClick={onCloseModal}
                href="/dashboard"
                className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm text-brand-mist-600 transition-colors duration-150 hover:bg-brand-mist-300/30 hover:text-brand-emerald-600 group"
              >
                <div className="text-brand-mist-400 transition-colors duration-150 group-hover:text-brand-mist-500">
                  <LuLayoutDashboard />
                </div>
                <p className="font-semibold">Dashboard</p>
              </Link>
            </li>
          </ul>
        )}

        <ul className="flex flex-col gap-0.5">
          {appNavbarMenuDropdown?.map((menu) => (
            <li key={menu.id}>
              <Link
                onClick={onCloseModal}
                href={menu.href}
                className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm text-brand-mist-600 transition-colors duration-150 hover:bg-brand-mist-300/30 hover:text-brand-emerald-600 group"
              >
                <div className="text-brand-mist-400 transition-colors duration-150 group-hover:text-brand-mist-500">
                  {menu.logo}
                </div>

                <p>{menu.name}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div
          onClick={onCloseModal}
          className="block md:hidden absolute text-brand-mist-500 hover:text-brand-emerald-500 -top-7 left-1 text-2xl cursor-pointer"
        >
          <IoClose />
        </div>
        <div>
          <LogoutButton className="mt-3 px-1 py-1 flex gap-2 items-center justify-center w-full bg-red-300/60 rounded-md hover:bg-red-900 hover:text-brand-mist-200 cursor-pointer transition-all duration-300">
            Logout
          </LogoutButton>
        </div>
      </div>
    </div>
  );
}

export default AppNavbarMenuDropdown;
