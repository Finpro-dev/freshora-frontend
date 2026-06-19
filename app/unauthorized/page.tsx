"use client";

import Button from "@/shared/components/Button";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-brand-emerald-700">
          401 / 403
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-mist-700 sm:text-5xl">
          Access denied
        </h1>

        <p className="mt-6 text-base leading-7 text-brand-mist-500 max-w-md mx-auto">
          Sorry, you don’t have permission to access this page. It might be
          restricted or require higher authentication privileges.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button btnType="primary" onClick={() => router.back()}>
            Go back previous
          </Button>
        </div>
      </div>
    </main>
  );
}
