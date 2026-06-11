"use client";

import defaultUserProfile from "@/public/user/default-user-profile.png";
import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "../store/auth-store/AuthStoreProvider";
import AppNavbarMenuDropdown from "./AppNavbarMenuDropdown";

function AppNavbarProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatar = useAuthStore((state) => state.avatar);
  const userAvatar = avatar || defaultUserProfile;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleOpenModal}
      onMouseLeave={handleCloseModal}>
      <div className="relative w-8 sm:w-10 h-8 sm:h-10 border-2 rounded-full border-mist-200 ring-3 ring-brand-emerald-700 overflow-hidden">
        <Image
          src={userAvatar}
          alt="Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {isModalOpen && <AppNavbarMenuDropdown onCloseModal={handleCloseModal} />}
    </div>
  );
}

export default AppNavbarProfile;
