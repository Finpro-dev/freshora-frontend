"use client";

import dynamic from "next/dynamic";
import ProductSliderSkeleton from "./ProductSliderSkeleton";

function ProductSliderWrapper() {
  const ProductSliderWithNoSSR = dynamic(
    () => import("@/app/(main)/_components/CarouselProductSlider"),
    {
      ssr: false,
      loading: () => <ProductSliderSkeleton />,
    },
  );

  return <ProductSliderWithNoSSR />;
}

export default ProductSliderWrapper;
