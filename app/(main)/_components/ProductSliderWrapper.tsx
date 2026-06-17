"use client";

import dynamic from "next/dynamic";

function ProductSliderWrapper() {
  const ProductSliderWithNoSSR = dynamic(
    () => import("@/app/(main)/_components/CarouselProductSlider"),
    {
      ssr: false,
      loading: () => <p>Loading ...</p>,
    },
  );

  return <ProductSliderWithNoSSR />;
}

export default ProductSliderWrapper;
