import BrowseProductCta from "./_components/BrowseProductCta";
import HeroBanner from "./_components/HeroBanner";
import ProductGrid from "./_components/ProductGrid";
import ProductLayout from "./_components/ProductLayout";
import ProductSliderWrapper from "./_components/ProductSliderWrapper";
import Services from "./_components/Services";
import ShowcaseBanner from "./_components/ShowcaseBanner";
import TextDivider from "./_components/TextDivider";

export default function Page() {
  return (
    <div className="min-h-dvh w-full font-sans">
      <main className="mt-5 sm:mt-10 mx-5 sm:mx-10 md:mx-15 lg:mx-20">
        <HeroBanner />
        <Services />
        <TextDivider>Our Products</TextDivider>

        <ProductLayout>
          <ProductSliderWrapper />
          <BrowseProductCta />
          <ProductGrid />
        </ProductLayout>

        <TextDivider>Food Wisdom</TextDivider>
        <ShowcaseBanner />
      </main>
    </div>
  );
}
