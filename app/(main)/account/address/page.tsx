import BackButton from "@/shared/components/BackButton";
import { Metadata } from "next";
import { Suspense } from "react";
import AddressList from "./_components/AddressList";
import AddressListSkeleton from "./_components/AddressListSkeleton";
import Button from "@/shared/components/Button";
import CreateAddressButton from "./_components/CreateAddressButton";

export const metadata: Metadata = {
  title: "Customer area",
};

export default function page() {
  return (
    <main className="min-h-dvh">
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[45%]">
          <div className="pt-10 pb-5 sm:pb-15">
            <div className="flex">
              <BackButton />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-mist-600 py-2 sm:py-3">
              Your Addresses
            </h1>
            <p className="text-sm text-brand-mist-500">
              View your address list and select your primary address
            </p>
          </div>

          <section>
            <CreateAddressButton />
          </section>

          {/* address list*/}
          <section>
            <Suspense fallback={<AddressListSkeleton />}>
              <AddressList />
            </Suspense>
          </section>
        </section>
      </div>
    </main>
  );
}
