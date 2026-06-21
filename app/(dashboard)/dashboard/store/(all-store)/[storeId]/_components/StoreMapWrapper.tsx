"use client";

import dynamic from "next/dynamic";
import StoreMapSkeleton from "./StoreMapSkeleton";

function StoreMapWrapper() {
  const MapWithNoSSR = dynamic(
    () =>
      import("@/app/(dashboard)/dashboard/store/(all-store)/[storeId]/_components/StoreMap"),
    {
      ssr: false,
      loading: () => <StoreMapSkeleton />,
    },
  );

  return (
    <div className="h-full w-full">
      <MapWithNoSSR />
    </div>
  );
}

export default StoreMapWrapper;
