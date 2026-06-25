"use client";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  hasPrev,
  hasNext,
}: ProductPaginationProps) {
  return (
    <div className="px-4 md:px-6 py-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <p className="text-sm text-brand-mist-500">
        Showing page{" "}
        <span className="font-medium text-brand-mist-700">{currentPage}</span>{" "}
        of <span className="font-medium text-brand-mist-700">{totalPages}</span>{" "}
        pages ({totalItems} items)
      </p>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-lg border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200 transition-colors text-sm disabled:opacity-50"
          disabled={!hasPrev}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                currentPage === pageNumber
                  ? "bg-brand-emerald-700 text-white"
                  : "border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className="px-3 py-1.5 rounded-lg border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200 transition-colors text-sm disabled:opacity-50"
          disabled={!hasNext}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
