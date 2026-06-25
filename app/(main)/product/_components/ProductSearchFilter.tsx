"use client";

import { Search, ChevronDown, SquareX } from "lucide-react";

interface ProductSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: { productCategoryId: string; category: string }[];
}

export default function ProductSearchFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}: ProductSearchFilterProps) {
  const hasActiveFilter = search || category !== "all";

  return (
    <div className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex flex-row gap-2 items-center w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full sm:w-64 appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option
                  key={cat.productCategoryId}
                  value={cat.productCategoryId}
                >
                  {cat.category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                onCategoryChange("all");
              }}
              className="p-2.5 border border-brand-mist-300 rounded-lg bg-white hover:bg-brand-mist-50 text-brand-mist-500 transition-colors flex items-center justify-center"
              title="Clear filters"
            >
              <SquareX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
