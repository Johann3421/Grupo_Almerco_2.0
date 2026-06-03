import { HeroSlider } from "@/components/home/HeroSlider";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BrandGrid } from "@/components/home/BrandGrid";
import { EventsSection } from "@/components/home/EventsSection";
import { ZoneBanners } from "@/components/home/ZoneBanners";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <BrandCarousel />
      <FeaturedProducts />
      <CategoryGrid />
      <ZoneBanners />
      <BrandGrid />
      <EventsSection />
    </>
  );
}
