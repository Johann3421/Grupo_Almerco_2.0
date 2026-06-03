"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function CategoryGrid() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray">
            Nuestros Productos
          </h2>
          <p className="mt-3 text-brand-gray-light text-lg">
            Encuentra todo lo que necesitas en tecnología
          </p>
          <div className="w-20 h-1 bg-brand-green mx-auto mt-4 rounded-full" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="category-card group bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center text-center hover:border-brand-green/30"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-green-50 flex items-center justify-center mb-3 group-hover:bg-brand-green group-hover:text-white transition-colors">
                  <span className="text-3xl">{cat.image || "📦"}</span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-brand-gray group-hover:text-brand-green transition-colors leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
