"use client";

import dynamic from "next/dynamic";

function EditMapWrapper() {
  const MapWithNoSSR = dynamic(
    () =>
      import("@/app/(main)/account/address/[addressId]/_components/EditMap"),
    {
      ssr: false,
      loading: () => <p>Loading Map...</p>,
    },
  );

  return <MapWithNoSSR />;
}

export default EditMapWrapper;
