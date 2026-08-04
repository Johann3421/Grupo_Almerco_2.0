"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Package } from "lucide-react";

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
    <section className="py-10 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Categorías Destacadas
            </h2>
            <p className="text-xs text-slate-500">
              Explora nuestro catálogo por línea de producto
            </p>
          </div>
          <Link
            href="/productos"
            className="text-xs font-semibold text-brand-green hover:underline"
          >
            Ver todo →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="group bg-slate-50 hover:bg-emerald-50/50 rounded-lg border border-slate-200/80 p-3.5 flex flex-col items-center text-center transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center mb-2 text-slate-700 group-hover:text-emerald-600 group-hover:border-emerald-300 transition-colors">
                  {cat.image && !cat.image.startsWith("http") && cat.image.length < 4 ? (
                    <span className="text-lg">{cat.image}</span>
                  ) : (
                    <Package className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs font-medium text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
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

