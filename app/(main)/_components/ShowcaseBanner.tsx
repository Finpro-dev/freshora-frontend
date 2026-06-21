import Image from "next/image";
import heroBanner from "@/public/home/hero-banner-2.jpeg";

function ShowcaseBanner() {
  return (
    <div className="relative w-full h-50 rounded-xl overflow-hidden border border-brand-mist-400 contrast-70">
      <Image
        src={heroBanner}
        alt="hom-hero-banner"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute h-full w-full bg-linear-to-t sm:bg-linear-to-r from-brand-emerald-800 to-brand-mist-200/10 flex flex-col gap-10 items-center sm:items-start justify-center px-5 sm:px-15">
        <div className="w-full md:w-[60%] lg:w-[60%]">
          <h3 className="text-sm sm:text-base text-mist-100 text-center sm:text-start">
            "The quality of the food you choose today shapes the energy, health,
            and well-being you experience tomorrow. Wholesome ingredients do
            more than satisfy hunger—they nourish your body & support your
            goals."
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseBanner;
