"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  siblingCount?: number;
}

export default function Pagination({
  totalPages,
  siblingCount = 1,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    router.push(createPageUrl(pageNumber));
  };

  const generatePageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return [];
  };

  const allPages = generatePageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 py-4">
      {/* BUTTON PREVIOUS */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-3 py-2 rounded-md border border-brand-mist-200 bg-brand-mist-100/50 text-sm font-medium text-brand-mist-600 transition-colors hover:bg-brand-mist-50 disabled:opacity-50 disabled:hover:brand-mist-100/50 hover:bg-brand-emerald-200/20 cursor-pointer disabled:cursor-not-allowed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* NOMOR HALAMAN */}
      <div className="flex items-center gap-1.5">
        {allPages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-sm text-brand-mist-400 select-none">
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page as number)}
              className={`min-w-9.5 h-9 h- flex items-center justify-center rounded-md text-sm font-medium transition-all duration-150 cursor-pointer ${
                isCurrent
                  ? "bg-brand-emerald-700 text-brand-mist-100 brand-mist-100/50 shadow-sm"
                  : "border border-brand-mist-200 bg-brand-mist-100/50 text-brand-mist-600 hover:bg-brand-mist-50 hover:bg-brand-emerald-200/20"
              }`}>
              {page}
            </button>
          );
        })}
      </div>

      {/* BUTTON NEXT */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-3 py-2 rounded-md border border-brand-mist-200 bg-brand-mist-100/50 text-sm font-medium text-brand-mist-600 transition-colors hover:bg-brand-mist-50 disabled:opacity-50 disabled:hover:bg-brand-mist-100/50 hover:bg-brand-emerald-200/20 cursor-pointer disabled:cursor-not-allowed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
