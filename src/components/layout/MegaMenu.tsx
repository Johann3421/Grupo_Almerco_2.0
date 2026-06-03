"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Tag, Sparkles, Monitor, Cpu, Laptop, Server } from "lucide-react";

const menuItems = [
  {
    name: "Productos",
    href: "/productos",
    icon: Monitor,
    submenu: [
      { name: "Laptops", href: "/categorias/laptops" },
      { name: "Monitores", href: "/categorias/monitores-pantallas" },
      { name: "Procesadores", href: "/categorias/procesadores" },
      { name: "Tarjetas Gráficas", href: "/categorias/tarjetas-graficas-nvidia" },
      { name: "Memorias RAM", href: "/categorias/memorias-ram" },
      { name: "Discos Duros", href: "/categorias/discos-duros-internos" },
      { name: "Placas Madre", href: "/categorias/placas-madre" },
      { name: "Case y Fuentes", href: "/categorias/case-fuentes" },
      { name: "Teclados", href: "/categorias/teclados" },
      { name: "Mouse", href: "/categorias/mouse" },
      { name: "Auriculares", href: "/categorias/auriculares-microfonos" },
      { name: "Impresoras", href: "/categorias/impresoras-scanners" },
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
      { name: "Corsair", href: "/marcas/corsair" },
      { name: "Logitech", href: "/marcas/logitech" },
      { name: "Intel", href: "/marcas/intel" },
      { name: "AMD", href: "/marcas/amd" },
      { name: "NVIDIA", href: "/marcas/nvidia" },
      { name: "Kingston", href: "/marcas/kingston" },
      { name: "Samsung", href: "/marcas/samsung" },
      { name: "Razer", href: "/marcas/razer" },
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
  {
    name: "Laptops",
    href: "/categorias/laptops",
    icon: Laptop,
    submenu: [
      { name: "Laptops Gaming", href: "/categorias/laptops?type=gaming" },
      { name: "Laptops Empresariales", href: "/categorias/laptops?type=business" },
      { name: "Laptops Uso General", href: "/categorias/laptops?type=general" },
      { name: "MacBooks", href: "/categorias/zona-mac-apple" },
    ],
  },
  {
    name: "PCs de Marca",
    href: "/categorias/pcs-desktop-de-marca",
    icon: Server,
    submenu: [
      { name: "HP Desktop", href: "/categorias/pcs-desktop-de-marca?brand=hp" },
      { name: "Lenovo Desktop", href: "/categorias/pcs-desktop-de-marca?brand=lenovo" },
      { name: "Dell Desktop", href: "/categorias/pcs-desktop-de-marca?brand=dell" },
    ],
  },
  {
    name: "PCs Ensambladas",
    href: "/categorias/pcs-ensambladas",
    icon: Cpu,
    submenu: [
      { name: "PC Gaming", href: "/categorias/pcs-ensambladas?type=gaming" },
      { name: "PC Oficina", href: "/categorias/pcs-ensambladas?type=office" },
      { name: "PC Diseño", href: "/categorias/pcs-ensambladas?type=design" },
      { name: "PC Workstation", href: "/categorias/pcs-ensambladas?type=workstation" },
    ],
  },
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-gray-200 hidden lg:block relative z-30">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-0">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative"
              onMouseEnter={() => item.submenu && setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold transition-colors ${
                  item.highlight
                    ? "text-brand-red hover:text-brand-red-dark"
                    : "text-brand-gray hover:text-brand-green"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
                {item.submenu && <ChevronDown className="w-3 h-3" />}
              </Link>

              {/* Dropdown */}
              {item.submenu && activeMenu === item.name && (
                <div className="absolute top-full left-0 bg-white rounded-b-xl shadow-xl border border-gray-100 min-w-[240px] mega-menu-enter z-50">
                  <div className="p-2">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2.5 text-sm text-brand-gray hover:bg-brand-green-50 hover:text-brand-green rounded-lg transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-3">
                    <Link
                      href={item.href}
                      className="block text-center text-sm text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
                    >
                      Ver todo →
                    </Link>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
