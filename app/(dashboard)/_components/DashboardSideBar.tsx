"use client";

import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import FreshoraLogoNoText from "./FreshoraLogoNoText";
import SideBarOpenMenuList from "./SideBarOpenMenuList";

function DashboardSideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSideBar = () => {
    setIsSidebarOpen((open) => !open);
  };

  return (
    <div
      className={`hidden sm:flex flex-col gap-10 ${isSidebarOpen ? "md:w-85" : "md:w-auto"} w-auto h-dvh border-r border-brand-mist-300`}>
      <section className="flex gap-2 justify-between items-start p-5">
        {isSidebarOpen && (
          <div className="hidden md:block">
            <h1 className="text-2xl font-semibold">Store Manager</h1>
            <h1>Freshora</h1>
          </div>
        )}
        <div
          onClick={handleToggleSideBar}
          className="cursor-pointer hidden md:block">
          <RiMenu3Fill className="text-2xl text-brand-mist-500" />
        </div>

        <div className="relative w-8 h-8 block md:hidden">
          <FreshoraLogoNoText />
        </div>
      </section>

      {/* Menu */}
      <section className="h-dvh flex flex-col justify-between gap-10">
        <SideBarOpenMenuList isSidebarOpen={isSidebarOpen} />
      </section>
    </div>
  );
}

export default DashboardSideBar;
