"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Loader2 } from "lucide-react";

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 8));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-8 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Productos Destacados</h2>
            <p className="text-xs text-slate-500">Equipos de cómputo y componentes más solicitados</p>
          </div>
          <Link
            href="/productos"
            className="text-xs font-semibold text-brand-green hover:underline"
          >
            Ver todos ({products.length}) →
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} image={product.images[0]} brand={product.brand?.name} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

