"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PromotionPaginationProps {
  currentPage: number;
  totalPages: number;
  totalData: number;
  onPageChange: (page: number) => void;
}

export default function PromotionPagination({
  currentPage,
  totalPages,
  totalData,
  onPageChange,
}: PromotionPaginationProps) {
  return (
    <div className="p-3 border-t border-brand-mist-100 bg-brand-mist-50/70 flex items-center justify-between text-xs font-semibold text-brand-mist-500">
      <span>
        Page {currentPage} of {totalPages} ({totalData} Total Promotion)
      </span>
      <div className="flex gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="p-1.5 bg-white border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 shadow-sm text-brand-mist-700 hover:bg-brand-mist-50 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="p-1.5 bg-white border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 shadow-sm text-brand-mist-700 hover:bg-brand-mist-50 transition"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
