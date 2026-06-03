import Link from "next/link";

const brands = [
  "3nStar", "Acer", "ADATA", "AMD", "Antec", "Antryx", "APC", "ASUS",
  "Astro", "Bitdefender", "Brother", "Canon", "Cooler Master", "Corsair",
  "Cougar", "Creative", "D-Link", "Dell", "Epson", "EVGA", "Forza",
  "Genius", "Gigabyte", "GoPro", "HP", "HyperX", "Intel", "JBL",
  "Kaspersky", "Kingston", "Lenovo", "Lexar", "LG", "LIAN LI",
  "Logitech", "Microsoft", "MSI", "NVIDIA", "Patriot", "PNY", "QNAP",
  "Razer", "Samsung", "SanDisk", "Seagate", "Synology", "Targus",
  "Team Group", "Thermaltake", "Toshiba", "TP-Link", "ViewSonic",
  "Wacom", "Western Digital", "XFX", "XP-Pen", "Xerox", "Zebra", "Zotac",
];

const brandColors: Record<string, string> = {
  AMD: "#ED1C24", Intel: "#0071C5", NVIDIA: "#76B900", ASUS: "#000",
  MSI: "#FF0000", Corsair: "#1b1b1b", Razer: "#44D62C", Samsung: "#1428A0",
  Logitech: "#00B8FC", HP: "#0096D6", Lenovo: "#E2231A", Dell: "#007DB8",
  Kingston: "#FF0000", LG: "#A50034", HyperX: "#FF0000", Gigabyte: "#EF7F1A",
  "Cooler Master": "#660099", Thermaltake: "#E31E25",
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function BrandGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray">
            Nuestras Marcas
          </h2>
          <p className="mt-3 text-brand-gray-light text-lg">
            Más de 50 marcas reconocidas mundialmente
          </p>
          <div className="w-20 h-1 bg-brand-green mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/marcas/${slugify(brand)}`}
              className="group bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-center h-16 hover:border-brand-green/30 hover:shadow-md transition-all"
            >
              <span
                className="font-bold text-xs text-center group-hover:scale-110 transition-transform"
                style={{ color: brandColors[brand] || "#2D3436" }}
              >
                {brand}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
