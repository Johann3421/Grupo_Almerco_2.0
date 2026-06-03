"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

const offerProducts = [
  { id: "o1", name: "ASUS ROG Strix G16 RTX 4070 i9-13980HX", slug: "asus-rog-strix-g16", price: 6499, comparePrice: 7999, image: "💻", brand: "ASUS", stock: 15, isOffer: true },
  { id: "o2", name: "MSI GeForce RTX 4070 SUPER VENTUS 3X 12GB", slug: "msi-rtx-4070-super", price: 2899, comparePrice: 3299, image: "🖥️", brand: "MSI", stock: 8, isOffer: true },
  { id: "o3", name: "Corsair Vengeance DDR5 32GB 6000MHz", slug: "corsair-vengeance-ddr5-32gb", price: 549, comparePrice: 699, image: "🔧", brand: "Corsair", stock: 25, isOffer: true },
  { id: "o4", name: "Samsung Odyssey G7 32\" 240Hz Gaming", slug: "samsung-odyssey-g7-32", price: 1899, comparePrice: 2299, image: "🖥️", brand: "Samsung", stock: 5, isOffer: true },
  { id: "o5", name: "AMD Ryzen 9 7950X3D 16 Cores", slug: "amd-ryzen-9-7950x3d", price: 2599, comparePrice: 2899, image: "⚡", brand: "AMD", stock: 7, isOffer: true },
  { id: "o6", name: "Kingston Fury Beast DDR5 16GB 5600MHz", slug: "kingston-fury-beast-ddr5", price: 279, comparePrice: 329, image: "🔧", brand: "Kingston", stock: 40, isOffer: true },
  { id: "o7", name: "Lenovo Legion Pro 5i RTX 4060", slug: "lenovo-legion-pro-5i", price: 5299, comparePrice: 5999, image: "💻", brand: "Lenovo", stock: 6, isOffer: true },
  { id: "o8", name: "ASUS TUF Gaming B760M-PLUS WiFi", slug: "asus-tuf-b760m-plus", price: 599, comparePrice: 699, image: "🔩", brand: "ASUS", stock: 14, isOffer: true },
];

export default function OfertasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-brand-red to-red-600 rounded-2xl p-8 mb-8 text-white text-center">
        <Flame className="w-10 h-10 mx-auto mb-3" />
        <h1 className="text-3xl font-bold">🔥 Ofertas Especiales</h1>
        <p className="mt-2 text-white/80">Los mejores precios en productos de tecnología</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {offerProducts.map((p) => <ProductCard key={p.id} {...p} />)}
      </div>
    </div>
  );
}
