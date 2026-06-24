"use client";

export default function CartItemSkeleton() {
  return (
    <div className="flex gap-4 py-4 first:pt-0 last:pb-0 items-start sm:items-center animate-pulse">
      <div className="w-16 h-16 rounded-md bg-brand-mist-200 dark:bg-brand-mist-200/20 shrink-0" />

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-x-2">
          <div className="h-4 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-1/2" />

          <div className="h-3.5 bg-brand-emerald-200/30 dark:bg-brand-emerald-200/10 rounded-sm w-12" />
        </div>

        <div className="h-3 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-3/4" />

        <div className="h-2.5 bg-brand-mist-200/60 dark:bg-brand-mist-200/10 rounded-sm w-16" />
      </div>

      <div className="text-right shrink-0 flex flex-col justify-center items-end space-y-1.5">
        <div className="h-3 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-14" />

        <div className="h-4 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-16" />
      </div>
    </div>
  );
}
