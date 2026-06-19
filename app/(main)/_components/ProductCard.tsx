import Button from "@/shared/components/Button";
import { capitalize } from "@/shared/utils/capitalize";
import Image from "next/image";
import {
  calculateDiscount,
  calculateTotalPrice,
} from "../_utils/carousel-product-util";
import DiscountTag from "./DiscountTag";
import { Product } from "@/shared/types/product-type";
import defaultProductThumbnail from "@/public/product/default-product-image.jpeg";

interface ProductCardProps {
  product: Product;
  quantity: number;
}

function ProductCard({ product, quantity }: ProductCardProps) {
  const {
    productPhotos,
    name,
    price: productPrice,
    unit,
    weightPerGram,
    grade,
    discount,
  } = product;

  const price = Number(discount?.[0]?.discountAmount)
    ? calculateTotalPrice(productPrice, Number(discount?.[0]?.discountAmount))
    : productPrice;

  const productThumbnail =
    productPhotos?.[0]?.photoUrl || defaultProductThumbnail;

  return (
    <div
      className={`mb-8 h-auto min-h-110 md:min-h-120 lg:min-h-100 ${!quantity && "grayscale cursor-not-allowed"} shadow-xl shadow-brand-mist-300/50 rounded-xl overflow-hidden`}>
      {/* image */}
      <div className="relative w-full h-50 sm:h-50 md:h-60 lg:h-65">
        <Image
          src={productThumbnail}
          alt="slug"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        {Number(discount?.[0]?.discountAmount) ? (
          <DiscountTag discountAmount={Number(discount?.[0]?.discountAmount)} />
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
              {Number(discount?.[0]?.discountAmount)
                ? price.toLocaleString("id-ID")
                : productPrice.toLocaleString("id-ID")}
            </p>

            {Number(discount?.[0]?.discountAmount) ? (
              <p className="text-brand-mist-400 text-sm line-through">
                Rp.{" "}
                {calculateDiscount(
                  productPrice,
                  Number(discount?.[0]?.discountAmount),
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
