"use client";

import Link from "next/link";
import { Laptop, Cpu, Monitor, HardDrive, Gamepad2, Layers, ArrowRight } from "lucide-react";

const catalogItems = [
  {
    title: "Catálogo Laptops & Portátiles",
    count: "48+ Modelos",
    icon: Laptop,
    href: "/categorias/laptops",
    color: "from-amber-500 to-orange-600",
    tags: ["ASUS ROG", "Lenovo Legion", "HP Pavilion", "MacBook"],
  },
  {
    title: "Catálogo Componentes & PC Parts",
    count: "120+ Componentes",
    icon: Cpu,
    href: "/categorias/procesadores",
    color: "from-zinc-800 to-zinc-950",
    tags: ["Intel 14va", "Ryzen 7000", "RTX 40 Series", "RAM DDR5"],
  },
  {
    title: "Catálogo Monitores & Pantallas",
    count: "35+ Pantallas",
    icon: Monitor,
    href: "/categorias/monitores-pantallas",
    color: "from-orange-600 to-red-600",
    tags: ["240Hz Gaming", "IPS 4K", "Curvo OLED", "Diseño Pro"],
  },
  {
    title: "Catálogo Zona Gaming & Periféricos",
    count: "90+ Accesorios",
    icon: Gamepad2,
    href: "/categorias/zona-gaming",
    color: "from-zinc-900 to-black",
    tags: ["Mouse Wireless", "Teclados Mecánicos", "Headsets 7.1"],
  },
];

export function CatalogShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600">
            Nuestros Catálogos
          </span>
          <h2 className="text-xl font-black text-zinc-900 tracking-tight">
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
              className="group relative bg-white border border-zinc-200 rounded-xl p-5 overflow-hidden transition-all duration-200 hover:border-orange-500 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${cat.color} text-white shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded-full">
                    {cat.count}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-zinc-900 group-hover:text-orange-600 transition-colors mb-2">
                  {cat.title}
                </h3>

                <div className="flex flex-wrap gap-1 mb-4">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-zinc-50 border border-zinc-200/80 text-zinc-600 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs font-bold text-zinc-800 group-hover:text-orange-600 transition-colors">
                <span>Ingresar al Catálogo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
