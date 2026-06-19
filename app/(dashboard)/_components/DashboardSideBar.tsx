"use client";

import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { sidebarDashboardMenu } from "../_statics/sidebar-menu-static";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DashboardSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSideBar = () => {
    setIsSidebarOpen((open) => !open);
  };

  const pathName = usePathname();

  console.log(pathName);

  return isSidebarOpen ? (
    <div className="flex flex-col gap-10 w-85 h-dvh border-r border-brand-mist-300">
      <div className="flex gap-2 justify-between items-start p-5">
        <div>
          <h1 className="text-2xl font-semibold">Store Manager</h1>
          <h1>Freshora</h1>
        </div>
        <div onClick={handleToggleSideBar}>
          <RiMenu3Fill className="text-2xl text-brand-mist-500" />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col px-2">
        {sidebarDashboardMenu?.map((menu, index) => (
          <Link
            href={menu.href}
            key={index}
            className={`${pathName === menu.href && "bg-brand-emerald-200/20 rounded-lg text-brand-emerald-700"} flex gap-3 py-2 px-5 hover:bg-brand-emerald-200/30 hover:text-brand-emerald-700 hover:rounded-lg transition-all duration-150`}>
            <div className="text-xl">{menu.logo}</div>
            <div className="text-base">
              <p>{menu.name}</p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  ) : (
    <p onClick={handleToggleSideBar}>closing</p>
  );
}

export default DashboardSideBar;
