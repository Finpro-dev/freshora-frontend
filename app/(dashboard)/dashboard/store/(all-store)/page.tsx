import Spinner from "@/shared/components/Spinner";
import { Suspense } from "react";
import StoreList from "./_components/StoreList";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

async function page({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <main className="min-h-dvh w-full px-5 mt-25 sm:mt-10 flex flex-col">
      <Suspense key={page} fallback={<Spinner />}>
        <StoreList currentPage={currentPage} />
      </Suspense>
    </main>
  );
}

export default page;
