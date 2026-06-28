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
    <div className="bg-brand-mist-100/10 rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input w-full pl-10 pr-4 py-2.5 border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
          />
        </div>

        <div className="flex flex-row gap-2 items-center w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="select w-full sm:w-64 border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm rounded-xl px-4 py-2.5 appearance-none pr-10"
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
              className="p-2.5 border border-brand-mist-300 rounded-lg bg-brand-mist-100/10 hover:bg-brand-mist-100/20 text-brand-mist-500 transition-colors flex items-center justify-center"
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
