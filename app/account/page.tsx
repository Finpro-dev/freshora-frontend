import BackButton from "@/shared/components/BackButton";
import Button from "@/shared/components/Button";
import { Suspense } from "react";
import ProfileOverview from "./_components/ProfileOverview";
import ProfileOverviewSkeleton from "./_components/ProfileOverviewSkeleton";

function page() {
  return (
    <main className="min-h-dvh">
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[65%]">
          <div className="pt-10 pb-5 sm:pb-15">
            <div className="flex">
              <BackButton />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-mist-600 py-2 sm:py-3">
              Profile Overview
            </h1>
            <p className="text-sm text-brand-mist-500">
              View your profile information
            </p>
          </div>
          <Suspense fallback={<ProfileOverviewSkeleton />}>
            <ProfileOverview />
          </Suspense>

          <div className="mt-5">
            <Button btnType="danger">Logout</Button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default page;
