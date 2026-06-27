export default function EditStoreFormSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-30 h-30 md:w-40 md:h-40 border-4 rounded-full border-brand-mist-200 ring-3 ring-brand-mist-200 bg-brand-mist-200" />

        <div className="h-3 w-48 bg-brand-mist-200 rounded" />

        <section className="w-full flex gap-4">
          <div className="w-full">
            <div className="h-4 w-20 bg-brand-mist-200 rounded mb-2" />
            <div className="h-12 w-full bg-brand-mist-100 rounded border border-brand-mist-200" />
          </div>
          <div className="w-full">
            <div className="h-4 w-16 bg-brand-mist-200 rounded mb-2" />
            <div className="h-12 w-full bg-brand-mist-100 rounded border border-brand-mist-200" />
          </div>
        </section>

        <section className="w-full">
          <div className="h-4 w-24 bg-brand-mist-200 rounded mb-2" />
          <div className="h-12 w-full bg-brand-mist-100 rounded border border-brand-mist-200" />
        </section>

        <section className="w-full flex md:flex-row flex-col gap-4">
          <div className="w-full">
            <div className="h-4 w-16 bg-brand-mist-200 rounded mb-2" />
            <div className="h-12 w-full bg-brand-mist-100 rounded border border-brand-mist-200" />
          </div>
          <div className="w-full">
            <div className="h-4 w-12 bg-brand-mist-200 rounded mb-2" />
            <div className="h-12 w-full bg-brand-mist-100 rounded border border-brand-mist-200" />
          </div>
        </section>

        <section className="w-full flex md:flex-row flex-col gap-4">
          <div className="w-full">
            <div className="h-4 w-16 bg-brand-mist-200 rounded mb-2" />
            <div className="h-12 w-full bg-brand-mist-100 rounded border border-brand-mist-200" />
          </div>
          <div className="w-full">
            <div className="h-4 w-20 bg-brand-mist-200 rounded mb-2" />
            <div className="h-12 w-full bg-brand-mist-100 rounded border border-brand-mist-200" />
          </div>
        </section>

        <section className="w-full">
          <div className="flex justify-between items-center mb-2">
            <div className="h-4 w-36 bg-brand-mist-200 rounded" />
            <div className="h-4 w-10 bg-brand-mist-200 rounded" />
          </div>
          <div className="h-12 w-full bg-brand-mist-100 rounded border border-brand-mist-200" />
        </section>
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-11 w-full bg-brand-mist-300 rounded" />

        <div className="h-11 w-full bg-brand-mist-200 rounded" />
      </div>
    </div>
  );
}
