"use client";

import { useState, useEffect } from "react";
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
          // Tomamos los primeros 8 productos para la página principal
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray">Productos Destacados</h2>
          <p className="mt-3 text-brand-gray-light text-lg">Lo mejor en tecnología seleccionado para ti</p>
          <div className="w-20 h-1 bg-brand-green mx-auto mt-4 rounded-full" />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} image={product.images[0]} brand={product.brand?.name} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
