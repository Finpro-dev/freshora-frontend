"use client";

import { Search, ChevronDown, RefreshCw } from "lucide-react";

interface ProductFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  categories: { id: string; name: string }[];
  onRefresh: () => void;
}

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  onRefresh,
}: ProductFiltersProps) {
  return (
    <div className="bg-brand-mist-100/10 rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm pl-10"
          />
        </div>

        <div className="flex flex-row gap-2 items-center w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="select w-full sm:w-auto border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm appearance-none pr-10"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="p-2.5 border border-brand-mist-300 rounded-lg text-brand-mist-500 hover:bg-brand-mist-50 transition-colors flex items-center justify-center"
            title="Refresh Categories & Products"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
