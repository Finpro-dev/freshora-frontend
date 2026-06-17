import Link from "next/link";

function BrowseProductCta() {
  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between my-15 px-10">
      {/* left */}
      <div className="flex items-center divide-x divide-brand-emerald-700 text-brand-emerald-700">
        <div className="text-3xl font-lg pr-3">
          <p className="md:text-start text-center">Selected Products</p>
        </div>
        <div className="text-sm pl-3">
          <p className="md:text-start text-center">
            Our selected products based on your location
          </p>
        </div>
      </div>

      {/* right */}
      <div className="md:block flex justify-center md:pt-0 pt-10">
        <Link
          href="/products"
          className="text-brand-mist-500 hover:text-brand-emerald-700">
          See more
        </Link>
      </div>
    </div>
  );
}

export default BrowseProductCta;
