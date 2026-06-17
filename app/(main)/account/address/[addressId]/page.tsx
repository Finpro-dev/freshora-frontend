"use client";

import BackButton from "@/shared/components/BackButton";
import { Address } from "@/shared/types/address-type";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditMapWrapper from "./_components/EditMapWrapper";
import { useGetAddressDetails } from "./_hooks/use-get-address-details";
import { useUserAddressStore } from "@/shared/store/user-address-store/UserAddressProvider";
import EditAddressForm from "./_components/EditAddressForm";

function page() {
  const { addressId } = useParams<{ addressId: string }>();
  const router = useRouter();
  const { data: address, isPending } = useGetAddressDetails(addressId);
  const setCords = useUserAddressStore((state) => state.setCords);

  const handleBack = () => {
    router.push("/account/address");
  };

  useEffect(() => {
    if (address) {
      setCords({ lat: address.latitude, lng: address.longitude });
    }
  }, [address]);

  return (
    <main className="min-h-dvh">
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[60%]">
          <div className="pt-10 pb-5 sm:pb-15">
            <div className="flex">
              <BackButton onBack={handleBack} />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-mist-600 py-2 sm:py-3">
              Edit your Address
            </h1>
            <p className="text-sm text-brand-mist-500">
              Edit your address details below
            </p>
          </div>
        </section>
      </div>

      {/* create address form */}
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[60%] px-5 py-5 shadow-sm shadow-brand-mist-300 border border-brand-mist-100 rounded-xl">
          <EditMapWrapper />
          {isPending ? (
            <p>Loading data...</p>
          ) : (
            <EditAddressForm address={address} />
          )}
        </section>
      </div>
    </main>
  );
}

export default page;
