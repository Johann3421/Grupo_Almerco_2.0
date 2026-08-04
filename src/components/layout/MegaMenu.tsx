"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Tag, Sparkles, Monitor, Cpu, Laptop, Menu } from "lucide-react";

const menuItems = [
  {
    name: "Laptops",
    href: "/categorias/laptops",
    icon: Laptop,
    submenu: [
      { name: "Laptops Gaming", href: "/categorias/laptops?type=gaming" },
      { name: "Laptops Empresariales", href: "/categorias/laptops?type=business" },
      { name: "MacBooks & Apple", href: "/categorias/zona-mac-apple" },
    ],
  },
  {
    name: "PCs Ensambladas",
    href: "/categorias/pcs-ensambladas",
    icon: Cpu,
    submenu: [
      { name: "PC Gaming Extreme", href: "/categorias/pcs-ensambladas?type=gaming" },
      { name: "PC Workstation", href: "/categorias/pcs-ensambladas?type=workstation" },
      { name: "PC Oficina", href: "/categorias/pcs-ensambladas?type=office" },
    ],
  },
  {
    name: "Componentes",
    href: "/productos",
    icon: Monitor,
    submenu: [
      { name: "Procesadores Intel / AMD", href: "/categorias/procesadores" },
      { name: "Tarjetas Gráficas RTX", href: "/categorias/tarjetas-graficas-nvidia" },
      { name: "Memorias RAM", href: "/categorias/memorias-ram" },
      { name: "Discos Duros / SSD", href: "/categorias/discos-duros-internos" },
      { name: "Placas Madre", href: "/categorias/placas-madre" },
    ],
  },
  {
    name: "Marcas",
    href: "/productos?view=brands",
    icon: Tag,
    submenu: [
      { name: "ASUS", href: "/marcas/asus" },
      { name: "MSI", href: "/marcas/msi" },
      { name: "Lenovo", href: "/marcas/lenovo" },
      { name: "HP", href: "/marcas/hp" },
      { name: "Intel", href: "/marcas/intel" },
      { name: "AMD", href: "/marcas/amd" },
      { name: "NVIDIA", href: "/marcas/nvidia" },
    ],
  },
  {
    name: "Novedades",
    href: "/novedades",
    icon: Sparkles,
    submenu: null,
  },
  {
    name: "Ofertas",
    href: "/ofertas",
    icon: Tag,
    highlight: true,
    submenu: null,
  },
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-slate-200 hidden lg:block relative z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <ul className="flex items-center gap-1">
          {/* Main All Categories Button */}
          <li className="relative">
            <Link
              href="/productos"
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-t transition-colors shadow-xs"
            >
              <Menu className="w-4 h-4 text-white" />
              <span>TODAS LAS CATEGORÍAS</span>
            </Link>
          </li>

          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative"
              onMouseEnter={() => item.submenu && setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                  item.highlight
                    ? "text-orange-600 hover:text-orange-700 font-bold"
                    : "text-slate-700 hover:text-orange-600"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.name}
                {item.submenu && <ChevronDown className="w-3 h-3 text-slate-400" />}
              </Link>

              {/* Submenu */}
              {item.submenu && activeMenu === item.name && (
                <div className="absolute top-full left-0 bg-white rounded-b border border-slate-200 shadow-lg min-w-[200px] z-50 py-1">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="text-xs font-semibold text-slate-500">
          Envíos a todo el Perú
        </div>
      </div>
    </nav>
  );
}

