"use client";

import dynamic from "next/dynamic";

function MapWrapper() {
  const MapWithNoSSR = dynamic(
    () => import("@/app/(main)/account/address/new/_components/Map"),
    {
      ssr: false,
      loading: () => <p>Loading Map...</p>,
    },
  );

  return <MapWithNoSSR />;
}

export default MapWrapper;
