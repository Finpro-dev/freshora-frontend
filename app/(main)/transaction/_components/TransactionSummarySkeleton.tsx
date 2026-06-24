"use client";

export default function TransactionSummarySkeleton() {
  return (
    <div className="w-full rounded-md border border-brand-mist-300 bg-color-background p-6 shadow-xs shadow-brand-mist-300/20 text-color-foreground space-y-6 animate-pulse">
      <div className="border-b border-brand-mist-200 pb-3">
        <div className="h-4 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-36" />
      </div>

      <div className="space-y-3">
        <div className="p-3 rounded-md border border-brand-mist-200 bg-brand-mist-100/40 dark:bg-brand-mist-200/5 flex items-center justify-between">
          <div className="space-y-1.5 flex-1">
            <div className="h-3 bg-brand-emerald-200/40 dark:bg-brand-emerald-200/10 rounded-sm w-24" />
            <div className="h-3.5 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-16" />
          </div>

          <div className="h-5 w-9 rounded-full bg-brand-mist-200 dark:bg-brand-mist-200/20 shrink-0" />
        </div>

        <div className="p-3 rounded-md border border-brand-mist-200 bg-brand-mist-100/40 dark:bg-brand-mist-200/5 flex items-center justify-between">
          <div className="space-y-1.5 flex-1">
            <div className="h-3 bg-indigo-200/30 dark:bg-indigo-200/10 rounded-sm w-28" />
            <div className="h-3.5 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-32" />
          </div>

          <div className="h-5 w-9 rounded-full bg-brand-mist-200 dark:bg-brand-mist-200/20 shrink-0" />
        </div>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <div className="h-3.5 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-28" />
          <div className="h-3.5 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-20" />
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-dashed border-brand-mist-200">
          <div className="h-3.5 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-20" />
          <div className="h-3.5 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-16" />
        </div>
      </div>

      <div className="border-t border-brand-mist-200 pt-4 flex justify-between items-center">
        <div className="h-4 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-20" />
        <div className="h-5 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-sm w-28" />
      </div>

      <div className="w-full h-10 bg-brand-mist-200 dark:bg-brand-mist-200/20 rounded-md" />
    </div>
  );
}
