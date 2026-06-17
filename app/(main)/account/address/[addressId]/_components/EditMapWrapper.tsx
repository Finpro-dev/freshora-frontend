"use client";

import dynamic from "next/dynamic";
import SkeletonMap from "../../_components/MapSekeleton";

function EditMapWrapper() {
  const MapWithNoSSR = dynamic(
    () =>
      import("@/app/(main)/account/address/[addressId]/_components/EditMap"),
    {
      ssr: false,
      loading: () => <SkeletonMap />,
    },
  );

  return <MapWithNoSSR />;
}

export default EditMapWrapper;
