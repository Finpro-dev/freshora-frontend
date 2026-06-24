// components/CourierDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { rajaOngkirCouriers } from "../_statics/raja-ongkir-shipping-courier-static";

interface CourierDropdownProps {
  selectedCourier: string | null;
  onCourierChange: (courier: string) => void;
}

export default function CourierDropdown({
  selectedCourier,
  onCourierChange,
}: CourierDropdownProps) {
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
        Select a courier
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 rounded-md border border-brand-mist-300 bg-color-background text-sm font-semibold uppercase tracking-wide text-brand-mist-800 shadow-xs shadow-brand-mist-300/10 hover:border-brand-emerald-500 transition-all duration-150 focus:outline-none focus:border-brand-emerald-500 focus:ring-1 focus:ring-brand-emerald-500 text-left cursor-pointer">
        {selectedCourier ? (
          <span className="text-brand-mist-800 font-extrabold">
            {selectedCourier}
          </span>
        ) : (
          <span className="text-brand-mist-400 font-normal normal-case">
            Select courier expedition
          </span>
        )}

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

      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 rounded-md border border-brand-mist-300 bg-color-background shadow-md shadow-brand-mist-300/30 max-h-64 overflow-y-auto grid grid-cols-1 divide-y divide-brand-mist-200 animate-in fade-in slide-in-from-top-1 duration-150 bg-brand-mist-100">
          {rajaOngkirCouriers.map((courier) => {
            const isSelected = selectedCourier === courier;

            return (
              <button
                key={courier}
                type="button"
                onClick={() => {
                  onCourierChange(courier);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-3 text-sm uppercase font-bold tracking-wider transition-colors duration-150 cursor-pointer hover:bg-brand-mist-100/60 ${
                  isSelected
                    ? "bg-brand-emerald-200/20 text-brand-emerald-700 dark:bg-brand-emerald-200/10 dark:text-brand-emerald-400"
                    : "text-brand-mist-700"
                }`}>
                <div className="flex items-center justify-between w-full">
                  <span>{courier}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald-500 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
