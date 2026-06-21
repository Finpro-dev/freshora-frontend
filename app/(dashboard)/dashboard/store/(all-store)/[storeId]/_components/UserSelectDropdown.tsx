"use client";

import defaultUserAvatar from "@/public/user/default-user-profile.png";
import { UnassignedStoreAdmin } from "@/shared/types/unassigned-store-admin";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

interface UserSelectDropdownProps {
  control: any;
  usersData: UnassignedStoreAdmin[];
  assignedStoreAdmin: UnassignedStoreAdmin | null;
}

export default function UserSelectDropdown({
  control,
  usersData = [],
  assignedStoreAdmin,
}: UserSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userOptions =
    assignedStoreAdmin !== null
      ? [...usersData, assignedStoreAdmin]
      : usersData;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full pb-5" ref={dropdownRef}>
      <Controller
        name="userId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedUser = userOptions?.find((u) => u?.userId === value);

          return (
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-3 p-3 rounded-md border border-brand-mist-200 bg-brand-mist-200/30 text-left shadow-sm transition-all duration-150 focus:outline-none cursor-pointer">
                {selectedUser ? (
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-brand-mist-100 bg-brand-mist-100">
                      <Image
                        src={selectedUser.avatar || "/default-avatar.png"}
                        alt={selectedUser.firstName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-mist-700 truncate">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </p>
                      <p className="text-xs text-brand-mist-400 truncate">
                        Store Admin
                      </p>
                    </div>
                  </div>
                ) : assignedStoreAdmin ? (
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-brand-mist-100 bg-brand-mist-100">
                      <Image
                        src={assignedStoreAdmin.avatar || defaultUserAvatar}
                        alt={assignedStoreAdmin.firstName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-mist-700 truncate">
                        {assignedStoreAdmin.firstName}{" "}
                        {assignedStoreAdmin.lastName}
                      </p>
                      <p className="text-xs text-brand-mist-400 truncate">
                        Store Admin
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-brand-mist-400">
                    Choose a user...
                  </span>
                )}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 text-brand-mist-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && (
                <ul className="absolute z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-md border border-brand-mist-200 bg-brand-mist-200 p-1 shadow-lg shadow-brand-mist-300/60 ring-1 ring-brand-emerald-500 animate-in fade-in slide-in-from-top-1 duration-150">
                  {userOptions.length === 0 ? (
                    <li className="p-3 text-sm text-center text-brand-mist-400">
                      No users found
                    </li>
                  ) : (
                    userOptions.map((user) => {
                      const isSelected = user?.userId === value;

                      return (
                        <li key={user?.userId}>
                          <button
                            type="button"
                            onClick={() => {
                              onChange(user?.userId);
                              setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 rounded px-3 py-2 text-left text-sm transition-colors duration-150 cursor-pointer ${
                              isSelected
                                ? "bg-brand-emerald-200/30 text-brand-emerald-700 font-medium"
                                : "text-brand-mist-600 hover:bg-brand-emerald-200/30"
                            }`}>
                            {/* Avatar */}
                            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-brand-mist-200 bg-brand-mist-50">
                              <Image
                                src={user?.avatar || defaultUserAvatar}
                                alt={user?.firstName as string}
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* Teks Info */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p
                                  className={`truncate ${isSelected ? "text-brand-emerald-900 font-semibold" : "text-brand-mist-700 font-medium"}`}>
                                  {user?.firstName} {user?.lastName}
                                </p>
                                {user?.isVerified ? (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-emerald-50 text-brand-emerald-700">
                                    Verified
                                  </span>
                                ) : (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-700">
                                    Not Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
