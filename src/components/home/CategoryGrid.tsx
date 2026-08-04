"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// Fallback para cuando la API no tiene datos
const fallbackCategories = [
  { name: "Laptops", slug: "laptops", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&auto=format&fit=crop&q=80" },
  { name: "PCs Ensambladas", slug: "pcs-ensambladas", image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=200&auto=format&fit=crop&q=80" },
  { name: "Procesadores", slug: "procesadores", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&auto=format&fit=crop&q=80" },
  { name: "Tarjetas Gráficas", slug: "tarjetas-graficas-nvidia", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&auto=format&fit=crop&q=80" },
  { name: "Monitores", slug: "monitores-pantallas", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&auto=format&fit=crop&q=80" },
  { name: "Zona Gaming", slug: "zona-gaming", image: "https://images.unsplash.com/photo-1593640408182-31c228814edd?w=200&auto=format&fit=crop&q=80" },
  { name: "Memorias RAM", slug: "memorias-ram", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80" },
  { name: "Discos SSD", slug: "discos-duros-internos", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&auto=format&fit=crop&q=80" },
  { name: "Periféricos", slug: "accesorios-perifericos", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200&auto=format&fit=crop&q=80" },
  { name: "Placas Madre", slug: "placas-madre", image: "https://images.unsplash.com/photo-1610700398062-b98a7e47f6d8?w=200&auto=format&fit=crop&q=80" },
  { name: "Fuentes de Poder", slug: "fuentes-de-poder", image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=200&auto=format&fit=crop&q=80" },
  { name: "POS / Empresa", slug: "punto-de-venta-pos", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&auto=format&fit=crop&q=80" },
];

export function CategoryGrid() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setCategories(data);
        else setCategories(fallbackCategories);
        setLoading(false);
      })
      .catch(() => {
        setCategories(fallbackCategories);
        setLoading(false);
      });
  }, []);

  const display = categories.length > 0 ? categories : fallbackCategories;

  return (
    <section className="py-8 bg-[#F4F5F7]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">Navega por</span>
            <h2 className="text-lg font-bold text-zinc-900 mt-0.5">Categorías Destacadas</h2>
          </div>
          <Link href="/productos" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
            Ver todo →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3">
            {display.map((cat) => {
              const imgSrc = cat.image && cat.image.startsWith("http") ? cat.image : null;
              return (
                <Link
                  key={cat.slug}
                  href={`/categorias/${cat.slug}`}
                  className="group bg-white hover:bg-orange-50 rounded-xl border border-zinc-200 hover:border-orange-300 overflow-hidden flex flex-col items-center text-center transition-all duration-200 hover:shadow-sm"
                >
                  {/* Category image */}
                  <div className="w-full h-20 overflow-hidden bg-zinc-100 flex items-center justify-center">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : cat.image && cat.image.length < 4 ? (
                      <span className="text-3xl">{cat.image}</span>
                    ) : (
                      <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400 text-xs">
                        {cat.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-800 group-hover:text-orange-600 transition-colors line-clamp-2 px-2 py-2.5 leading-tight">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

