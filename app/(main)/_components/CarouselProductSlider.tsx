"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { productsCarouselStatic } from "../_statics/products-carousel-static";
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
  return (
    <div className="slider-container px-10">
      <Slider {...settings}>
        {productsCarouselStatic?.map((product, i: number) => (
          <ProductCard key={i} product={product} />
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider;
