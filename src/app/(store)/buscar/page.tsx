"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { Search } from "lucide-react";
import { Suspense } from "react";

const allProducts = [
  { id: "1", name: "ASUS ROG Strix G16 RTX 4070 i9-13980HX", slug: "asus-rog-strix-g16", price: 6499, comparePrice: 7999, image: "💻", brand: "ASUS", stock: 15, isNew: true, isOffer: true },
  { id: "2", name: "MSI GeForce RTX 4070 SUPER VENTUS 3X", slug: "msi-rtx-4070-super", price: 2899, comparePrice: 3299, image: "🖥️", brand: "MSI", stock: 8, isOffer: true },
  { id: "3", name: "Intel Core i9-14900K 24 Cores 6.0GHz", slug: "intel-core-i9-14900k", price: 2199, image: "⚡", brand: "Intel", stock: 12, isNew: true },
  { id: "4", name: "Corsair Vengeance DDR5 32GB 6000MHz", slug: "corsair-vengeance-ddr5-32gb", price: 549, comparePrice: 699, image: "🔧", brand: "Corsair", stock: 25, isOffer: true },
  { id: "5", name: "Samsung Odyssey G7 32\" WQHD 240Hz", slug: "samsung-odyssey-g7-32", price: 1899, comparePrice: 2299, image: "🖥️", brand: "Samsung", stock: 5, isNew: true, isOffer: true },
  { id: "6", name: "Logitech G PRO X SUPERLIGHT 2", slug: "logitech-g-pro-x-superlight-2", price: 459, image: "🖱️", brand: "Logitech", stock: 30, isNew: true },
  { id: "7", name: "AMD Ryzen 9 7950X3D 16 Cores", slug: "amd-ryzen-9-7950x3d", price: 2599, comparePrice: 2899, image: "⚡", brand: "AMD", stock: 7, isOffer: true },
  { id: "8", name: "Razer BlackWidow V4 Pro Keyboard", slug: "razer-blackwidow-v4-pro", price: 789, image: "⌨️", brand: "Razer", stock: 18, isNew: true },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const filtered = query ? allProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())) : allProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Search className="w-6 h-6 text-brand-green" />
          <h1 className="text-2xl font-bold text-brand-gray">Resultados para &quot;{query}&quot;</h1>
        </div>
        <p className="text-brand-gray-light">{filtered.length} productos encontrados</p>
      </div>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => <ProductCard key={p.id} {...p} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-brand-gray mb-2">No se encontraron resultados</h2>
          <p className="text-brand-gray-light">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><p>Buscando...</p></div>}>
      <SearchResults />
    </Suspense>
  );
}
