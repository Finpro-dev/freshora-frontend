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
          className="input w-full pl-9 pr-4 py-2.5 border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
        />
      </div>

      <button
        onClick={onToggleSort}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 border border-brand-mist-300 rounded-xl bg-brand-mist-100/10 hover:bg-brand-mist-100/20 text-sm font-bold text-brand-mist-700 transition-all shrink-0"
      >
        <ArrowUpDown className="w-4 h-4 text-brand-mist-500" />
        <span>
          Sort: {sortOrder === "desc" ? "Newest First" : "Oldest First"}
        </span>
      </button>
    </div>
  );
}
