import Image from "next/image";
import heroBanner from "@/public/home/hero-banner-1.jpeg";

function HeroBanner() {
  return (
    <div className="relative w-full h-100 md:h-130 rounded-xl overflow-hidden border border-brand-mist-400">
      <Image
        src={heroBanner}
        alt="hom-hero-banner"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
      <div className="absolute h-full w-full bg-linear-to-t sm:bg-linear-to-r from-brand-emerald-800 to-brand-mist-200/10 flex flex-col gap-10 items-center sm:items-start justify-center px-5 sm:px-15">
        <div className="text-5xl md:text-7xl font-bold text-mist-100">
          <h1 className="text-center">
            From the <span className="text-emerald-400 ">farm</span>
          </h1>
          <h2 className="text-center">To your hands</h2>
        </div>

        <div className="w-full md:w-[60%] lg:w-[40%]">
          <h3 className="text-sm sm:text-base text-mist-100 text-center sm:text-start">
            Fresh, organic groceries delivered from local farms to your door
            step. Quality you can taste, convenience you deserve .
          </h3>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
