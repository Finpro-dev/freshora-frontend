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
        {/* <div className="text-5xl md:text-7xl font-bold text-mist-100">
          <h1 className="text-center">
            From the <span className="text-emerald-400 ">farm</span>
          </h1>
          <h2 className="text-center">To your hands</h2>
        </div> */}

        <div className="w-full md:w-[60%] lg:w-[60%]">
          <h3 className="text-sm sm:text-base text-mist-100 text-center sm:text-start">
            Discover farm-fresh fruits, vegetables, and everyday essentials
            carefully selected from local growers. Experience exceptional
            quality, natural flavors, and reliable delivery that makes healthy
            living easier every day.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseBanner;
