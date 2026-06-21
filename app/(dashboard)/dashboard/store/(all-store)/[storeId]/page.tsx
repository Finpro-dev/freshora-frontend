"use client";

import { ApiResponse } from "@/shared/types/api-type";
import { StoreType } from "@/shared/types/store-types";
import { useParams } from "next/navigation";
import StoreMapWrapper from "./_components/StoreMapWrapper";
import { useGetStoreDetails } from "./hooks/use-get-store-details";
import EditStoreForm from "./_components/EditStoreForm";

function page() {
  const { storeId } = useParams<Record<string, string>>();
  const { data, isLoading } = useGetStoreDetails(storeId);
  const storeData: ApiResponse<StoreType> = data;
  const store = storeData?.data as StoreType;

  return (
    <main className="px-5 mt-25 sm:mt-10 flex">
      <div className="w-full flex-col flex lg:flex-row gap-5">
        <section className="w-full lg:w-[50%] px-2 py-2 border border-brand-mist-300 rounded-md shadow-md shadow-brand-mist-300/30">
          <StoreMapWrapper />
        </section>
        {isLoading ? (
          // fixme ->> add loading skeleton
          <p>Loading ...</p>
        ) : (
          <section className="w-full lg:w-[50%] px-2 py-2 ">
            <EditStoreForm store={store} />
          </section>
        )}
      </div>
    </main>
  );
}

export default page;
