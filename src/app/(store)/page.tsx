import { HeroSlider } from "@/components/home/HeroSlider";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CatalogShowcase } from "@/components/home/CatalogShowcase";
import { ZoneBanners } from "@/components/home/ZoneBanners";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ShieldCheck, Truck, CreditCard, Headset } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-4 pb-12">
      {/* Hero Section */}
      <HeroSlider />

      {/* Trust & Benefits Bar */}
      <div className="bg-white border-y border-zinc-200 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-orange-600 shrink-0" />
            <div>
              <p className="font-bold text-zinc-900 leading-tight">Envíos a Nivel Nacional</p>
              <p className="text-zinc-500 leading-tight">Despacho diario a todo el Perú</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-zinc-900 shrink-0" />
            <div>
              <p className="font-bold text-zinc-900 leading-tight">Garantía 100% Oficial</p>
              <p className="text-zinc-500 leading-tight">Soporte directo con la marca</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-orange-600 shrink-0" />
            <div>
              <p className="font-bold text-zinc-900 leading-tight">Pagos Seguros</p>
              <p className="text-zinc-500 leading-tight">Yape, PLIN, Tarjetas & Transferencias</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Headset className="w-5 h-5 text-zinc-900 shrink-0" />
            <div>
              <p className="font-bold text-zinc-900 leading-tight">Asesoría Especializada</p>
              <p className="text-zinc-500 leading-tight">Atención directa por WhatsApp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Showcase Section */}
      <CatalogShowcase />

      {/* Main Categories */}
      <CategoryGrid />

      {/* Featured Products Catalog */}
      <FeaturedProducts />

      {/* Corporate Zone Banners */}
      <ZoneBanners />

      {/* Brand Strip */}
      <BrandCarousel />
    </div>
  );
}



