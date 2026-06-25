// components/AddressDropdown.tsx
"use client";

import Button from "@/shared/components/Button";
import { Address } from "@/shared/types/address-type";
import { useState, useRef, useEffect } from "react";

interface AddressDropdownProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onAddressChange: (address: Address) => void;
}

export default function AddressDropdown({
  addresses,
  selectedAddress,
  onAddressChange,
}: AddressDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="relative w-full text-color-foreground" ref={dropdownRef}>
      <label className="block text-xs font-bold uppercase tracking-wider text-brand-mist-500 mb-2 select-none">
        Select your address
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 rounded-md border border-brand-mist-300 bg-color-background text-sm font-medium text-brand-mist-800 shadow-xs shadow-brand-mist-300/10 hover:border-brand-emerald-500 transition-all duration-150 focus:outline-none focus:border-brand-emerald-500 focus:ring-1 focus:ring-brand-emerald-500 text-left cursor-pointer ">
        {selectedAddress ? (
          <div className="truncate pr-4">
            <span className="font-bold text-brand-mist-800">
              {selectedAddress.addressStatus === "PRIMARY" ? "[Primary] " : ""}
              {selectedAddress.address}
            </span>
            <span className="block text-xs text-brand-mist-500 font-normal mt-0.5 truncate">
              {selectedAddress.district}, {selectedAddress.city},{" "}
              {selectedAddress.province}
            </span>
          </div>
        ) : (
          <span className="text-brand-mist-400 font-normal">
            Select your destination
          </span>
        )}

        {/* Ikon Panah Indikator */}
        <svg
          className={`w-4 h-4 text-brand-mist-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ISI MENU DROPDOWN LIST */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 rounded-md border border-brand-mist-300 bg-color-background shadow-md shadow-brand-mist-300/30 max-h-60 overflow-y-auto divide-y divide-brand-mist-200 animate-in fade-in slide-in-from-top-1 duration-150 bg-brand-mist-100">
          {addresses.length === 0 ? (
            <div className="p-4 text-center text-xs text-brand-mist-400 font-medium">
              <p>No address record is found</p>
              <Button btnType="secondary" href="/account/address/new">
                Create one
              </Button>
            </div>
          ) : (
            addresses.map((addr) => {
              const isSelected = selectedAddress?.addressId === addr.addressId;
              const isPrimary = addr.addressStatus === "PRIMARY";

              return (
                <button
                  key={addr.addressId}
                  type="button"
                  onClick={() => {
                    onAddressChange(addr); // Simpan objek penuh ke state induk
                    setIsOpen(false); // Tutup menu dropdown
                  }}
                  className={`w-full text-left p-3.5 text-sm transition-colors duration-150 flex flex-col gap-0.5 cursor-pointer hover:bg-brand-mist-100/60 ${
                    isSelected
                      ? "bg-brand-emerald-200/20 text-brand-emerald-800 dark:bg-brand-emerald-200/10 dark:text-brand-emerald-400 font-semibold"
                      : ""
                  }`}>
                  <div className="flex items-center gap-2 w-full">
                    <span className="truncate flex-1 font-bold text-brand-mist-800">
                      {addr.address}
                    </span>
                    {isPrimary && (
                      <span className="shrink-0 px-1.5 py-0.5 text-[9px] font-extrabold rounded-sm tracking-wider uppercase bg-brand-emerald-200 text-brand-emerald-800 dark:bg-brand-emerald-800/40 dark:text-brand-emerald-300">
                        Utama
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-brand-mist-500 font-normal truncate">
                    Kec. {addr.district}, {addr.city}, Prov. {addr.province} (
                    {addr.postalCode})
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
