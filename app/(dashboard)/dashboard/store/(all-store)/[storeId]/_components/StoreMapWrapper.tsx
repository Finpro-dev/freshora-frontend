"use client";

import SkeletonMap from "@/app/(main)/account/address/_components/MapSekeleton";
import dynamic from "next/dynamic";

function StoreMapWrapper() {
  const MapWithNoSSR = dynamic(
    () =>
      import("@/app/(dashboard)/dashboard/store/(all-store)/[storeId]/_components/StoreMap"),
    {
      ssr: false,
      loading: () => <SkeletonMap />,
    },
  );

  return <MapWithNoSSR />;
}

export default StoreMapWrapper;
