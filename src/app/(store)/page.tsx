import { HeroSlider } from "@/components/home/HeroSlider";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ZoneBanners } from "@/components/home/ZoneBanners";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="space-y-6 pb-12">
      <HeroSlider />
      <CategoryGrid />
      <FeaturedProducts />
      <ZoneBanners />
      <BrandCarousel />
    </div>
  );
}

