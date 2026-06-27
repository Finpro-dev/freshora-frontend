"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { ProductStockDiscount } from "@/shared/types/product-stock-discount-type";
import { useGetProducts } from "../_hooks/use-get-product";
import ProductCard from "./ProductCard";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Navigation } from "swiper/modules";
import ProductSliderSkeleton from "./ProductSliderSkeleton";

function ProductSwiper() {
  const { nearestStoreId: storeId, isLoading: isGetNearestStoreLoading } =
    useUserCoordinatesStore((state) => state);
  const { data, isLoading: isGetProductsLoading } = useGetProducts(storeId);
  const product: ProductStockDiscount[] = data?.data?.products;

  const isLoading = isGetProductsLoading || !data || isGetNearestStoreLoading;
  return isLoading ? (
    <ProductSliderSkeleton />
  ) : (
    <div className="relative w-full overflow-hidden px-4 sm:px-10">
      <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full border border-brand-mist-200 bg-brand-mist-100/90 text-brand-mist-600 shadow-md transition-all active:scale-95 md:hover:bg-brand-emerald-50 md:hover:text-brand-emerald-600 md:hover:border-brand-emerald-300 cursor-pointer">
        <IoChevronBack className="text-xl" />
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          480: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full">
        {product?.map((product: any, i: number) => (
          <SwiperSlide key={i} className="py-4">
            <ProductCard
              product={product?.product}
              quantity={product?.quantity}
              storeId={storeId}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full border border-brand-mist-200 bg-brand-mist-100/90  text-brand-mist-600 shadow-md transition-all active:scale-95 md:hover:bg-brand-emerald-50 md:hover:text-brand-emerald-600 md:hover:border-brand-emerald-300 cursor-pointer">
        <IoChevronForward className="text-xl" />
      </button>
    </div>
  );
}

export default ProductSwiper;
