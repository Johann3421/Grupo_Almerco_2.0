"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Loader2 } from "lucide-react";

const initialSampleProducts = [
  {
    id: "sample-1",
    name: "ASUS ROG Strix G16 i9-13980HX RTX 4070 16GB SSD 1TB 240Hz",
    slug: "asus-rog-strix-g16",
    price: 6499.00,
    comparePrice: 7299.00,
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop"],
    brand: { name: "ASUS" },
    stock: 12,
    isNew: true,
    isOffer: true,
  },
  {
    id: "sample-2",
    name: "Procesador Intel Core i9-14900K 24-Cores 6.0GHz LGA1700",
    slug: "intel-core-i9-14900k",
    price: 2199.00,
    comparePrice: 2499.00,
    images: ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop"],
    brand: { name: "INTEL" },
    stock: 15,
    isNew: true,
    isOffer: false,
  },
  {
    id: "sample-3",
    name: "Tarjeta de Video MSI GeForce RTX 4070 SUPER Ventus 3X 12GB",
    slug: "msi-rtx-4070-super",
    price: 2899.00,
    comparePrice: 3199.00,
    images: ["https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop"],
    brand: { name: "MSI" },
    stock: 8,
    isNew: false,
    isOffer: true,
  },
  {
    id: "sample-4",
    name: "Lenovo Legion Pro 5 Ryzen 7 7745HX RTX 4060 16GB 1TB SSD",
    slug: "lenovo-legion-pro-5",
    price: 5199.00,
    comparePrice: 5799.00,
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop"],
    brand: { name: "LENOVO" },
    stock: 5,
    isNew: true,
    isOffer: true,
  },
  {
    id: "sample-5",
    name: "Monitor Gamer LG UltraGear 27\" 180Hz 1ms IPS QHD 2K HDR",
    slug: "monitor-lg-ultragear-27",
    price: 1149.00,
    comparePrice: 1399.00,
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop"],
    brand: { name: "LG" },
    stock: 20,
    isNew: false,
    isOffer: true,
  },
  {
    id: "sample-6",
    name: "SSD Samsung 990 PRO 2TB NVMe M.2 PCIe 4.0 7450MB/s",
    slug: "samsung-990-pro-2tb",
    price: 849.00,
    comparePrice: 999.00,
    images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop"],
    brand: { name: "SAMSUNG" },
    stock: 25,
    isNew: false,
    isOffer: true,
  },
  {
    id: "sample-7",
    name: "Mouse Gamer Logitech G PRO X Superlight 2 Wireless 60g 32K DPI",
    slug: "logitech-g-pro-x-superlight-2",
    price: 459.00,
    comparePrice: 529.00,
    images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop"],
    brand: { name: "LOGITECH" },
    stock: 18,
    isNew: true,
    isOffer: false,
  },
  {
    id: "sample-8",
    name: "Teclado Mecánico Corsair K70 RGB PRO Cherry MX Red",
    slug: "teclado-corsair-k70-pro",
    price: 549.00,
    comparePrice: 649.00,
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop"],
    brand: { name: "CORSAIR" },
    stock: 10,
    isNew: false,
    isOffer: true,
  },
];

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 8));
        } else {
          setProducts(initialSampleProducts);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setProducts(initialSampleProducts);
        setLoading(false);
      });
  }, []);

  const displayProducts = products.length > 0 ? products : initialSampleProducts;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Productos Destacados</h2>
            <p className="text-xs text-slate-500">Equipos de cómputo y componentes más solicitados con garantía oficial</p>
          </div>
          <Link
            href="/productos"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Ver catálogo completo ({displayProducts.length}) →
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product} 
                image={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || "")} 
                brand={product.brand?.name || product.brand} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


