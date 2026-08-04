"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export function MainHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const itemCount = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const mobileMenuCategories = [
    { name: "Laptops & Notebooks", href: "/categorias/laptops" },
    { name: "PCs Ensambladas", href: "/categorias/pcs-ensambladas" },
    { name: "PCs de Marca", href: "/categorias/pcs-desktop-de-marca" },
    { name: "Tarjetas Gráficas", href: "/categorias/tarjetas-graficas-nvidia" },
    { name: "Procesadores", href: "/categorias/procesadores" },
    { name: "Zona Gaming", href: "/categorias/zona-gaming" },
    { name: "Puntos POS / Empresa", href: "/categorias/punto-de-venta-pos" },
    { name: "Ofertas Especiales", href: "/ofertas" },
    { name: "Mi Cuenta", href: "/cuenta" },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white hover:bg-slate-800 lg:hidden shrink-0" />}>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-slate-900 text-white p-0 border-slate-800">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="p-4 border-b border-slate-800 flex items-center gap-2 font-bold text-lg">
                <Cpu className="w-5 h-5 text-orange-500" />
                <span>GRUPO ALMERCO</span>
              </div>
              <nav className="p-4 space-y-1">
                {mobileMenuCategories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2.5 px-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded text-xs font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Corporate Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-full bg-orange-600 border-2 border-orange-500 flex items-center justify-center text-white font-black text-xl shadow-sm tracking-tighter">
              GA
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-extrabold text-base tracking-tight text-white">
                GRUPO ALMERCO
              </span>
              <span className="text-[10px] font-semibold text-orange-400 tracking-wider uppercase mt-0.5">
                Tecnología & Cómputo
              </span>
            </div>
          </Link>

          {/* High Density Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Buscar por marca, modelo o código de producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3.5 pr-10 py-1.5 h-9 rounded bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-orange-500 text-xs"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-1 rounded transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Account & Cart Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/cuenta" className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <div className="p-1.5 rounded-full bg-slate-800">
                <User className="w-4 h-4 text-orange-400" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 leading-tight">Bienvenido</span>
                <span className="text-xs font-semibold leading-tight">Mi Cuenta</span>
              </div>
            </Link>

            <Link href="/carrito" className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-1.5 rounded text-xs font-medium transition-colors shadow-xs">
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-slate-900 text-white text-[9px] min-w-[14px] h-[14px] flex items-center justify-center p-0 rounded-full border border-orange-500">
                    {itemCount}
                  </Badge>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-orange-100">Carrito</span>
                <span className="font-bold text-xs mt-0.5">S/ {subtotal.toFixed(2)}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


