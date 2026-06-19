"use client";

export default function ProductSliderSkeleton() {
  const items = [...Array(4)];

  return (
    <div className="w-full px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((_, i) => {
          let visibilityClass = "";
          if (i === 1) visibilityClass = "hidden sm:block";
          if (i === 2) visibilityClass = "hidden md:block";
          if (i === 3) visibilityClass = "hidden lg:block";

          return (
            <div
              key={i}
              className={`${visibilityClass} mb-8 h-auto min-h-110 md:min-h-120 lg:min-h-100 shadow-xl shadow-brand-mist-300/50 rounded-xl overflow-hidden animate-pulse bg-brand-mist-200/50 border border-brand-mist-200`}>
              <div className="w-full h-50 sm:h-50 md:h-60 lg:h-65 bg-brand-mist-300" />

              <div className="flex flex-col justify-between px-5 py-3">
                <div>
                  <div className="space-y-2 mt-2">
                    <div className="h-6 bg-brand-mist-300 rounded w-3/4" />
                    <div className="h-4 bg-brand-mist-300 rounded w-1/2" />
                  </div>

                  <div className="pt-5 flex items-center gap-4">
                    <div className="h-6 bg-brand-mist-300 rounded w-1/3" />
                    <div className="h-4 bg-brand-mist-300 rounded w-1/4" />
                  </div>

                  <div className="pt-3">
                    <div className="h-4 bg-brand-mist-300 rounded w-1/4" />
                  </div>
                </div>

                <div className="pt-6 pb-2">
                  <div className="h-10 bg-brand-mist-300 rounded-lg w-full" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
