"use client";

import { StoreType } from "@/shared/types/store-types";
import { useParams } from "next/navigation";
import EditStoreForm from "./_components/EditStoreForm";
import StoreMapWrapper from "./_components/StoreMapWrapper";
import { useGetStoreDetails } from "./hooks/use-get-store-details";
import { useEffect } from "react";
import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";

function page() {
  const { storeId } = useParams<Record<string, string>>();
  const { data, isLoading } = useGetStoreDetails(storeId);
  const storeData: StoreType = data;

  // testing only
  const handleFetchStoreTesting = async () => {
    const res = await fetch(
      `${CORS_CREDENTIALS.API_BASE_URL}/stores/${storeId}`,
      { method: "GET", credentials: "include" },
    );

    const data = await res.json();
    console.log("DATA", data?.data);
  };

  useEffect(() => {
    handleFetchStoreTesting();
  }, []);

  return (
    <main className="px-5 pt-25 sm:pt-10 flex flex-col min-h-screen w-full bg-slate-50">
      <div className="w-full flex flex-col lg:flex-row gap-5">
        <section className="w-full lg:w-[50%] h-112.5 lg:h-175 flex flex-col px-2 py-2 border border-brand-mist-300 rounded-md shadow-md shadow-brand-mist-300/30">
          <StoreMapWrapper />
        </section>
        {isLoading ? (
          <div className="w-full lg:w-[50%] h-full flex justify-center items-center">
            <p>Loading ...</p>
          </div>
        ) : (
          <section className="w-full lg:w-[50%] px-2 py-2 ">
            <EditStoreForm store={storeData} />
          </section>
        )}
      </div>
    </main>
  );
}

export default page;
