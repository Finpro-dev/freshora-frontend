"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="mb-8 h-auto min-h-110 md:min-h-120 lg:min-h-100 shadow-xl shadow-brand-mist-300/50 rounded-xl overflow-hidden animate-pulse bg-brand-mist-200/50 border border-brand-mist-200">
      <div className="w-full h-50 sm:h-50 md:h-60 lg:h-65 bg-brand-mist-300" />

      <div className="flex flex-col justify-between px-5 py-3">
        <div>
          <div>
            <div className="h-7 bg-brand-mist-300 rounded w-3/4 mt-1" />
            <div className="h-4 bg-brand-mist-300 rounded w-1/2 mt-2" />
          </div>

          <div className="pt-3 flex items-center gap-4">
            <div className="h-6 bg-brand-mist-300 rounded w-1/3" />
            <div className="h-4 bg-brand-mist-300 rounded w-1/4" />
          </div>

          <div className="pt-1 mt-1">
            <div className="h-4 bg-brand-mist-300 rounded w-1/3" />
          </div>
        </div>

        <div className="pt-4 pb-1">
          <div className="h-10 bg-brand-mist-300 rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
}
