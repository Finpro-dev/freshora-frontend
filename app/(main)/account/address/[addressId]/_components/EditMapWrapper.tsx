"use client";

import dynamic from "next/dynamic";

interface EditMapWrapperProps {
  lat: number;
  lng: number;
}

function EditMapWrapper({ lat, lng }: EditMapWrapperProps) {
  const MapWithNoSSR = dynamic(
    () =>
      import("@/app/(main)/account/address/[addressId]/_components/EditMap"),
    {
      ssr: false,
      loading: () => <p>Loading Map...</p>,
    },
  );

  return <MapWithNoSSR lat={lat} lng={lng} />;
}

export default EditMapWrapper;
