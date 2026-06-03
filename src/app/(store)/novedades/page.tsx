"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { Sparkles } from "lucide-react";

const newProducts = [
  { id: "n1", name: "Intel Core i9-14900K 24 Cores 6.0GHz", slug: "intel-core-i9-14900k", price: 2199, image: "⚡", brand: "Intel", stock: 12, isNew: true },
  { id: "n2", name: "Logitech G PRO X SUPERLIGHT 2 Wireless", slug: "logitech-g-pro-x-superlight-2", price: 459, image: "🖱️", brand: "Logitech", stock: 30, isNew: true },
  { id: "n3", name: "Razer BlackWidow V4 Pro Mechanical", slug: "razer-blackwidow-v4-pro", price: 789, image: "⌨️", brand: "Razer", stock: 18, isNew: true },
  { id: "n4", name: "HyperX Cloud III Wireless Headset", slug: "hyperx-cloud-iii-wireless", price: 549, image: "🎧", brand: "HyperX", stock: 20, isNew: true },
  { id: "n5", name: "Samsung 990 PRO 2TB NVMe SSD", slug: "samsung-990-pro-2tb", price: 849, image: "💾", brand: "Samsung", stock: 15, isNew: true },
  { id: "n6", name: "ASUS ROG Swift OLED PG27AQDM 27\"", slug: "asus-rog-swift-oled", price: 3499, image: "🖥️", brand: "ASUS", stock: 4, isNew: true },
];

export default function NovedadesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-brand-blue to-indigo-600 rounded-2xl p-8 mb-8 text-white text-center">
        <Sparkles className="w-10 h-10 mx-auto mb-3" />
        <h1 className="text-3xl font-bold">✨ Novedades</h1>
        <p className="mt-2 text-white/80">Los últimos productos en llegar a TechStore</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newProducts.map((p) => <ProductCard key={p.id} {...p} />)}
      </div>
    </div>
  );
}
