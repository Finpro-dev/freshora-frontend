"use client";

import { SlidersHorizontal } from "lucide-react";

interface PromotionFiltersProps {
  statusFilter: string;
  onStatusChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
}

export default function PromotionFilters({
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
}: PromotionFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-brand-mist-200 shadow-sm">
      <div className="flex items-center gap-2 text-brand-mist-500 text-xs font-bold uppercase tracking-wider mr-2">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Control Filters:</span>
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="bg-brand-mist-50/70 border border-brand-mist-300 text-brand-mist-800 font-semibold text-xs rounded-xl px-3 py-2 h-[38px] focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
      >
        <option value="">All Promotion</option>
        <option value="ACTIVE">Active</option>
        <option value="UPCOMING">Upcoming</option>
        <option value="EXPIRED">Expired</option>
      </select>

      <select
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value)}
        className="bg-brand-mist-50/70 border border-brand-mist-300 text-brand-mist-800 font-semibold text-xs rounded-xl px-3 py-2 h-[38px] focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
      >
        <option value="">All Promotion Types</option>
        <option value="NO_REQUIREMENT">No Requirement</option>
        <option value="MIN_TRANSACTION">Minimum Transaction</option>
        <option value="BUY_ONE_GET_ONE">Buy One Get One (BOGO)</option>
      </select>
    </div>
  );
}
