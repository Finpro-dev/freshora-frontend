import { Product } from "@/shared/types/product-type";
import { capitalize } from "@/shared/utils/capitalize";
import Image from "next/image";
import {
  calculateDiscount,
  calculateTotalPrice,
} from "../_utils/carousel-product-util";
import DiscountTag from "./DiscountTag";
import Button from "@/shared/components/Button";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const {
    productPhotos,
    name,
    price: productPrice,
    unit,
    weightPerGram,
    grade,
    discount,
    stocks: { quantity },
  } = product;

  const price = discount?.discountAmount
    ? calculateTotalPrice(productPrice, discount?.discountAmount)
    : productPrice;

  return (
    <div
      className={`mb-8 h-auto min-h-110 md:min-h-120 lg:min-h-100 ${!quantity && "grayscale cursor-not-allowed"} shadow-xl shadow-brand-mist-300/50 rounded-xl overflow-hidden`}>
      {/* image */}
      <div className="relative w-full h-50 sm:h-50 md:h-60 lg:h-65">
        <Image
          src={String(productPhotos?.[0]?.photoUrl)}
          alt="slug"
          fill
          className="object-cover object-center"
        />
        {discount?.discountAmount ? (
          <DiscountTag discountAmount={discount?.discountAmount} />
        ) : null}
      </div>

      <div className="flex flex-col justify-between px-5 py-3">
        <div>
          <div>
            <h4 className="text-brand-mist-600 text-xl font-semibold">
              {name}
            </h4>
            <p className="text-sm text-brand-mist-500">
              {weightPerGram} gram | {capitalize(unit)} | Grade {grade}
            </p>
          </div>

          {/* price */}
          <div className="pt-3 flex items-center gap-4">
            <p className="text-orange-900 text-lg font-semibold">
              Rp{" "}
              {discount?.discountAmount
                ? price.toLocaleString("id-ID")
                : productPrice.toLocaleString("id-ID")}
            </p>

            {discount?.discountAmount ? (
              <p className="text-brand-mist-400 text-sm line-through">
                Rp.{" "}
                {calculateDiscount(
                  productPrice,
                  discount?.discountAmount,
                ).toLocaleString("id-ID")}
              </p>
            ) : null}
          </div>

          <div className="pt-1">
            {quantity ? (
              <p className="text-xs text-brand-mist-500">
                Ready {quantity} {capitalize(unit)}
                {quantity > 0 ? "s" : ""}
              </p>
            ) : (
              <p className="text-xs text-brand-mist-500">Stock empty</p>
            )}
          </div>
        </div>

        {/* button */}
        <div className="pt-4">
          <Button btnType="primary">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
