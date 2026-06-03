"use client";

import { useParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";

const brandProducts: Record<string, { name: string; products: Array<{ id: string; name: string; slug: string; price: number; comparePrice?: number; image: string; brand: string; stock: number; isNew?: boolean; isOffer?: boolean }> }> = {
  asus: {
    name: "ASUS",
    products: [
      { id: "b1", name: "ASUS ROG Strix G16 RTX 4070", slug: "asus-rog-strix-g16", price: 6499, comparePrice: 7999, image: "💻", brand: "ASUS", stock: 15, isNew: true, isOffer: true },
      { id: "b2", name: "ASUS TUF Gaming B760M-PLUS WiFi", slug: "asus-tuf-b760m-plus", price: 599, comparePrice: 699, image: "🔩", brand: "ASUS", stock: 14, isOffer: true },
      { id: "b3", name: "ASUS ROG Swift OLED PG27AQDM", slug: "asus-rog-swift-oled", price: 3499, image: "🖥️", brand: "ASUS", stock: 4, isNew: true },
    ],
  },
  msi: {
    name: "MSI",
    products: [
      { id: "bm1", name: "MSI GeForce RTX 4070 SUPER VENTUS", slug: "msi-rtx-4070-super", price: 2899, comparePrice: 3299, image: "🖥️", brand: "MSI", stock: 8, isOffer: true },
      { id: "bm2", name: "MSI Katana 15 RTX 4060", slug: "msi-katana-15", price: 4299, comparePrice: 4999, image: "💻", brand: "MSI", stock: 10, isOffer: true },
    ],
  },
};

const defaultBrand = {
  name: "Marca",
  products: [
    { id: "db1", name: "Producto de esta Marca", slug: "producto-ejemplo", price: 999, image: "📦", brand: "Marca", stock: 20, isNew: true },
  ],
};

export default function MarcaPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = brandProducts[slug] || { ...defaultBrand, name: slug.replace(/-/g, " ").toUpperCase() };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-gray">Productos {data.name}</h1>
        <p className="text-brand-gray-light mt-1">{data.products.length} productos encontrados</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((p) => <ProductCard key={p.id} {...p} />)}
      </div>
    </div>
  );
}
