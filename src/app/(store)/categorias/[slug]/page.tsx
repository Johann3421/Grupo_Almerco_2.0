"use client";

import { useParams } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";

const categoryProducts: Record<string, { title: string; products: Array<{ id: string; name: string; slug: string; price: number; comparePrice?: number; image: string; brand: string; stock: number; isNew?: boolean; isOffer?: boolean }> }> = {
  laptops: {
    title: "Laptops",
    products: [
      { id: "c1", name: "ASUS ROG Strix G16 RTX 4070", slug: "asus-rog-strix-g16", price: 6499, comparePrice: 7999, image: "💻", brand: "ASUS", stock: 15, isNew: true, isOffer: true },
      { id: "c2", name: "Lenovo Legion Pro 5i RTX 4060", slug: "lenovo-legion-pro-5i", price: 5299, comparePrice: 5999, image: "💻", brand: "Lenovo", stock: 6, isNew: true, isOffer: true },
      { id: "c3", name: "MSI Katana 15 RTX 4060", slug: "msi-katana-15", price: 4299, comparePrice: 4999, image: "💻", brand: "MSI", stock: 10, isOffer: true },
      { id: "c4", name: "HP Victus 16 RTX 4050", slug: "hp-victus-16", price: 3499, image: "💻", brand: "HP", stock: 20, isNew: true },
    ],
  },
  procesadores: {
    title: "Procesadores",
    products: [
      { id: "cp1", name: "Intel Core i9-14900K 24 Cores", slug: "intel-core-i9-14900k", price: 2199, image: "⚡", brand: "Intel", stock: 12, isNew: true },
      { id: "cp2", name: "AMD Ryzen 9 7950X3D 16 Cores", slug: "amd-ryzen-9-7950x3d", price: 2599, comparePrice: 2899, image: "⚡", brand: "AMD", stock: 7, isOffer: true },
      { id: "cp3", name: "Intel Core i7-14700K 20 Cores", slug: "intel-core-i7-14700k", price: 1599, image: "⚡", brand: "Intel", stock: 18, isNew: true },
      { id: "cp4", name: "AMD Ryzen 7 7800X3D 8 Cores", slug: "amd-ryzen-7-7800x3d", price: 1799, comparePrice: 1999, image: "⚡", brand: "AMD", stock: 15, isOffer: true },
    ],
  },
};

const defaultCat = {
  title: "Categoría",
  products: [
    { id: "d1", name: "Producto Destacado de esta Categoría", slug: "producto-ejemplo", price: 999, image: "📦", brand: "TechStore", stock: 20, isNew: true },
    { id: "d2", name: "Otro Producto Popular", slug: "producto-ejemplo-2", price: 599, comparePrice: 799, image: "📦", brand: "TechStore", stock: 15, isOffer: true },
  ],
};

export default function CategoriaPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = categoryProducts[slug] || { ...defaultCat, title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-gray">{data.title}</h1>
        <p className="text-brand-gray-light mt-1">{data.products.length} productos encontrados</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((p) => <ProductCard key={p.id} {...p} />)}
      </div>
    </div>
  );
}
