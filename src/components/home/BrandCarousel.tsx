"use client";

const brands = [
  "Intel", "AMD", "NVIDIA", "ASUS", "MSI", "Corsair", "Logitech",
  "Kingston", "Samsung", "HP", "Lenovo", "Dell", "Razer", "HyperX",
  "Gigabyte", "Cooler Master", "Thermaltake", "Western Digital",
  "Seagate", "LG", "ViewSonic", "TP-Link", "EVGA", "Zotac",
  "Acer", "Brother", "Canon", "Epson", "JBL", "SanDisk",
];

const brandColors: Record<string, string> = {
  Intel: "#0071C5",
  AMD: "#ED1C24",
  NVIDIA: "#76B900",
  ASUS: "#000000",
  MSI: "#FF0000",
  Corsair: "#F0F000",
  Logitech: "#00B8FC",
  Kingston: "#FF0000",
  Samsung: "#1428A0",
  Razer: "#44D62C",
};

export function BrandCarousel() {
  return (
    <section className="py-8 bg-gray-50 overflow-hidden">
      <div className="brand-scroll">
        <div className="brand-scroll-content gap-12 px-8">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center justify-center min-w-[120px] h-16 bg-white rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span
                className="font-bold text-sm whitespace-nowrap"
                style={{ color: brandColors[brand] || "#2D3436" }}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
