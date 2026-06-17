import { PiTagSimpleFill } from "react-icons/pi";

interface DiscountTagProps {
  discountAmount: number;
}

function DiscountTag({ discountAmount }: DiscountTagProps) {
  return (
    <div className="absolute top-0 -left-2">
      <PiTagSimpleFill className="relative text-7xl text-brand-emerald-400/60"></PiTagSimpleFill>
      <p className="absolute top-6.5 left-4 text-sm font-semibold text-brand-mist-100 ">
        {discountAmount} %
      </p>
    </div>
  );
}

export default DiscountTag;
