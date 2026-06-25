"use client";

import { ChevronDown } from "lucide-react";

interface Store {
  storeId: string;
  name: string;
}

interface ReportFiltersProps {
  isSuperAdmin: boolean;
  selectedStoreId: string | null;
  onSelectStore: (storeId: string | null) => void;
  stores: Store[];
  year: number;
  onYearChange: (year: number) => void;
  month: number;
  onMonthChange: (month: number) => void;
  monthOptions: { value: number; label: string }[];
}

export default function ReportFilters({
  isSuperAdmin,
  selectedStoreId,
  onSelectStore,
  stores,
  year,
  onYearChange,
  month,
  onMonthChange,
  monthOptions,
}: ReportFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div />
      <div className="flex items-center gap-3 flex-wrap">
        {isSuperAdmin && (
          <div className="relative">
            <select
              value={selectedStoreId || ""}
              onChange={(e) => onSelectStore(e.target.value || null)}
              className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            >
              <option value="">All Stores</option>
              {stores.map((store) => (
                <option key={store.storeId} value={store.storeId}>
                  {store.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
          </div>
        )}
        <select
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
          <option value={2027}>2027</option>
          <option value={2028}>2028</option>
        </select>
        <div className="relative">
          <select
            value={month}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
          >
            {monthOptions.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
