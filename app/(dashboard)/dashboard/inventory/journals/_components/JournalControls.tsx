"use client";

import { Search, ArrowUpDown } from "lucide-react";

interface JournalControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onToggleSort: () => void;
}

export default function JournalControls({
  searchQuery,
  onSearchChange,
  sortOrder,
  onToggleSort,
}: JournalControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-brand-mist-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-brand-mist-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 shadow-sm"
        />
      </div>

      <button
        onClick={onToggleSort}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 border border-brand-mist-300 rounded-xl bg-white hover:bg-brand-mist-50 text-sm font-bold text-brand-mist-700 shadow-sm transition-all shrink-0"
      >
        <ArrowUpDown className="w-4 h-4 text-brand-mist-500" />
        <span>
          Sort: {sortOrder === "desc" ? "Newest First" : "Oldest First"}
        </span>
      </button>
    </div>
  );
}
