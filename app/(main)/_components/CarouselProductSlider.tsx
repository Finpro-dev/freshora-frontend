"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { ProductStockDiscount } from "@/shared/types/product-stock-discount-type";
import { useGetProducts } from "../_hooks/use-get-product";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
import ProductCard from "./ProductCard";

function ProductSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { nearestStoreId: storeId, isLoading: isGetNearestStoreLoading } =
    useUserCoordinatesStore((state) => state);
  const { data } = useGetProducts(storeId);
  const totalPage = data?.data?.totalPage;
  const totalData = data?.data?.totalData;
  const product: ProductStockDiscount[] = data?.data?.products;
  return (
    <div className="slider-container px-10">
      <Slider {...settings}>
        {product?.map((product, i: number) => (
          <ProductCard
            key={i}
            product={product?.product}
            quantity={product?.quantity}
            storeId={storeId}
          />
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider;
