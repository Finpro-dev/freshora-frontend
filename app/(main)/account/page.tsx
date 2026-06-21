import BackButton from "@/shared/components/BackButton";
import { Metadata } from "next";
import { Suspense } from "react";
import { ImAddressBook } from "react-icons/im";
import { MdEditSquare } from "react-icons/md";
import LogoutButton from "./_components/LogoutButton";
import ProfileOverview from "./_components/ProfileOverview";
import ProfileOverviewSkeleton from "./_components/ProfileOverviewSkeleton";
import UserConfigBar from "./_components/UserConfigBar";

export const metadata: Metadata = {
  title: "Customer area",
};

function page() {
  return (
    <main className="min-h-dvh">
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[45%]">
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

          {/* profile overview */}
          <Suspense fallback={<ProfileOverviewSkeleton />}>
            <ProfileOverview />
          </Suspense>

          {/* user config */}
          <UserConfigBar to="/account/edit" label="Edit profile">
            <MdEditSquare />
          </UserConfigBar>

          {/* address config */}
          <UserConfigBar to="/account/address" label="Address management">
            <ImAddressBook />
          </UserConfigBar>

          <div className="mt-5">
            <LogoutButton>Logout</LogoutButton>
          </div>
        </section>
      </div>
    </main>
  );
}

export default page;
