"use client";

import BackButton from "@/shared/components/BackButton";
import MapWrapper from "../new/_components/MapWrapper";
import { useGetAddressDetails } from "./_hooks/use-get-address-details";
import { useParams } from "next/navigation";
import { ApiResponse } from "@/shared/types/api-type";
import { Address, AddressType } from "@/shared/types/address-type";
import { useUserAddressStore } from "@/shared/store/user-address-store/UserAddressProvider";
import { useEffect } from "react";

function page() {
  const { addressId } = useParams<{ addressId: string }>();
  const res = useGetAddressDetails(addressId);
  const address: Address = res?.data?.data;
  console.log(address);

  const setCords = useUserAddressStore((state) => state.setCords);

  useEffect(() => {
    if (address?.latitude && address?.longitude)
      setCords({ lat: address?.latitude, lng: address?.longitude });
  }, []);

  return (
    <main className="min-h-dvh">
      <div className="flex justify-center">
        <section className="w-[95%] sm:w-[90%] md:w-[75%] lg:w-[60%]">
          <div className="pt-10 pb-5 sm:pb-15">
            <div className="flex">
              <BackButton />
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
          <MapWrapper />
          {/* <CreateAddressForm /> */}
        </section>
      </div>
    </main>
  );
}

export default page;
