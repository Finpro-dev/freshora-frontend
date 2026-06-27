export default function StoreListSkeleton() {
  const skeletonItems = Array.from({ length: 5 });

  return (
    <section className="w-full flex flex-col gap-5">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="animate-pulse w-full flex flex-col sm:flex-row gap-6 p-5 rounded-md border border-brand-mist-200 bg-brand-mist-100/30 shadow-sm">
          <div className="w-full sm:w-40 h-40 shrink-0 rounded-md bg-brand-mist-200" />

          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="h-6 w-1/3 bg-brand-mist-300 rounded" />
                <div className="h-5 w-16 bg-brand-emerald-200/40 rounded" />
              </div>

              <div className="h-4 w-1/4 bg-brand-mist-200" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-brand-mist-200 rounded" />
                <div className="h-4 w-1/2 bg-brand-mist-200 rounded" />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-brand-mist-200 flex items-center gap-3">
              <div className="w-8 h-8 shrink-0 rounded-full bg-brand-mist-300" />

              <div className="w-full space-y-1">
                <div className="h-3 w-16 bg-brand-mist-200 rounded" />
                <div className="h-4 w-24 bg-brand-mist-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
