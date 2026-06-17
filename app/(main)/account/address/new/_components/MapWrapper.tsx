"use client";

import dynamic from "next/dynamic";
import SkeletonMap from "../../_components/MapSekeleton";

function MapWrapper() {
  const MapWithNoSSR = dynamic(
    () => import("@/app/(main)/account/address/new/_components/Map"),
    {
      ssr: false,
      loading: () => <SkeletonMap />,
    },
  );

  return <MapWithNoSSR />;
}

export default MapWrapper;
