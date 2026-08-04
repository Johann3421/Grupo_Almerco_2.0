import Link from "next/link";

const mainBrands = [
  "Intel", "AMD", "NVIDIA", "ASUS", "MSI", "Corsair", "Logitech",
  "Kingston", "Samsung", "HP", "Lenovo", "Dell", "Razer", "Gigabyte"
];

export function BrandCarousel() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
        Marcas Principales
      </h2>
      <div className="flex flex-wrap gap-2.5 items-center justify-between border-t border-b border-slate-100 py-4">
        {mainBrands.map((brand) => (
          <Link
            key={brand}
            href={`/productos?q=${encodeURIComponent(brand)}`}
            className="px-3.5 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-semibold rounded border border-slate-200/60 transition-colors"
          >
            {brand}
          </Link>
        ))}
      </div>
    </section>
  );
}

