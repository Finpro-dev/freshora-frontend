export default function ProfileOverviewSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full flex justify-center gap-10 items-center px-5 py-5 rounded-sm shadow-sm border border-brand-mist-200">
        <div className="w-20 sm:w-30 h-20 sm:h-30 rounded-full bg-brand-mist-200 border-2 border-brand-mist-100" />

        <div className="flex-1">
          <div className="h-8 w-48 bg-brand-mist-200 rounded-md mb-4" />
          <div className="h-4 w-40 bg-brand-mist-200 rounded-md mb-2" />
          <div className="h-4 w-32 bg-brand-mist-200 rounded-md mb-3" />
          <div className="h-6 w-24 bg-brand-mist-200 rounded-md" />
        </div>
      </div>

      <div className="mt-5 px-5 py-10 rounded-sm shadow-sm border border-brand-mist-100 bg-brand-mist-100/50">
        <div className="h-5 w-40 bg-brand-mist-200 rounded-md" />
      </div>

      <div className="flex gap-10 mt-5">
        <div className="px-5 py-5 w-[50%] border border-brand-mist-100 rounded-sm shadow-sm">
          <div className="mb-5">
            <div className="h-5 w-36 bg-brand-mist-200 rounded-md mb-2" />
            <div className="h-3 w-48 bg-brand-mist-200 rounded-md" />
          </div>
          <div className="h-9 w-40 bg-brand-mist-200 rounded-md mt-2" />
        </div>

        <div className="px-5 py-5 w-[50%] border-2 border-dashed border-brand-mist-200 rounded-sm shadow-sm">
          <div className="mb-5">
            <div className="h-5 w-32 bg-brand-mist-200 rounded-md mb-2" />
            <div className="h-3 w-56 bg-brand-mist-200 rounded-md" />
          </div>
          <div>
            <div className="h-9 w-48 bg-brand-mist-200 rounded-md mb-2" />
            <div className="h-3 w-32 bg-brand-mist-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
