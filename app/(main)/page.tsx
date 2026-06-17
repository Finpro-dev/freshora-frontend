import HeroBanner from "./_components/HeroBanner";
import ProductSlider from "./_components/CarouselProductSlider";
import ProductSliderWrapper from "./_components/ProductSliderWrapper";
import Services from "./_components/Services";
import TextDivider from "./_components/TextDivider";
import BrowseProductCta from "./_components/BrowseProductCta";
import ProductGrid from "./_components/ProductGrid";
import ShowcaseBanner from "./_components/ShowcaseBanner";

export default function Page() {
  return (
    <div className="min-h-dvh w-full font-sans">
      <main className="mt-5 sm:mt-10 mx-5 sm:mx-10 md:mx-15 lg:mx-20">
        <HeroBanner />
        <Services />
        <TextDivider>Our Products</TextDivider>

        <section>
          <ProductSliderWrapper />
          <BrowseProductCta />
        </section>

        <section>
          <ProductGrid />
        </section>

        <TextDivider>Food Wisdom</TextDivider>
        <ShowcaseBanner />
      </main>
    </div>
  );
}
