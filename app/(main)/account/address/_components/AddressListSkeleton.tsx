export default function AddressListSkeleton() {
  const skeletonRows = Array.from({ length: 5 });

  return (
    // container
    <div className="h-[60%] space-y-4 sm:h-100 overflow-y-auto px-3 py-3 shadow-sm shadow-brand-mist-300 border border-brand-mist-100 rounded-xl animate-pulse">
      {skeletonRows.map((_, i) => (
        /* address card */
        <div
          key={i}
          className="relative w-full flex justify-between items-center gap-2 sm:gap-3 pr-5 pl-5 py-5 sm:pr-5 sm:pl-10 sm:py-5 rounded-sm shadow-sm shadow-brand-mist-300 border border-brand-mist-100 bg-brand-mist-100/30">
          {/* left side */}
          <div className="space-y-3 w-2/3">
            <div>
              {/* province */}
              <div className="h-6 w-32 bg-brand-mist-300 rounded-md mb-2" />

              {/* icon */}
              <div className="absolute top-0 left-0 w-8 h-8 bg-brand-emerald-200/50 rounded-br-md" />
            </div>

            <div className="space-y-2">
              {/* postal code */}
              <div className="h-4 w-16 bg-brand-mist-300 rounded-md" />
              {/* address details */}
              <div className="h-4 w-full bg-brand-mist-200 rounded-md" />
            </div>
          </div>

          {/* button or icon (right side) */}
          <div className="shrink-0">
            <div className="h-10 w-20 bg-brand-mist-300 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
