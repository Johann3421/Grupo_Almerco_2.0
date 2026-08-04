"use client";

import Link from "next/link";
import { Laptop, Cpu, Monitor, Gamepad2, Layers, ArrowRight } from "lucide-react";

const catalogItems = [
  {
    title: "Catálogo Laptops & Portátiles",
    count: "48+ Modelos",
    icon: Laptop,
    href: "/categorias/laptops",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
    tags: ["ASUS ROG", "Lenovo Legion", "HP Pavilion", "MacBook"],
  },
  {
    title: "Catálogo Componentes & PC Parts",
    count: "120+ Componentes",
    icon: Cpu,
    href: "/categorias/procesadores",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80",
    tags: ["Intel 14va", "Ryzen 7000", "RTX 40 Series", "RAM DDR5"],
  },
  {
    title: "Catálogo Monitores & Pantallas",
    count: "35+ Pantallas",
    icon: Monitor,
    href: "/categorias/monitores-pantallas",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
    tags: ["240Hz Gaming", "IPS 4K", "Curvo OLED", "Diseño Pro"],
  },
  {
    title: "Catálogo Zona Gaming & Periféricos",
    count: "90+ Accesorios",
    icon: Gamepad2,
    href: "/categorias/zona-gaming",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    tags: ["Mouse Wireless", "Teclados Mecánicos", "Headsets 7.1"],
  },
];

export function CatalogShowcase() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
              Nuestros Catálogos
            </span>
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight mt-0.5">
              Explora los Catálogos Principales
            </h2>
          </div>
          <Link
            href="/productos"
            className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <Layers className="w-4 h-4" />
            Ver Catálogo Completo →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {catalogItems.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={cat.href}
                className="group bg-white border border-zinc-200/90 rounded-xl overflow-hidden transition-all duration-200 hover:border-orange-500 hover:shadow-md flex flex-col justify-between"
              >
                {/* Stock image banner */}
                <div className="relative h-32 overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                    onError={(e) => {
                      // Fallback if network image fails
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Badge & Icon overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-orange-600 text-white shadow-xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-white drop-shadow-xs">{cat.count}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 group-hover:text-orange-600 transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cat.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-zinc-100/80 text-zinc-600 px-2 py-0.5 rounded font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-zinc-100 text-xs font-bold text-zinc-700 group-hover:text-orange-600 transition-colors">
                    <span>Ingresar al Catálogo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-orange-600" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

