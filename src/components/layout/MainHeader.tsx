"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, Heart, Monitor } from "lucide-react";
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const mobileMenuCategories = [
    { name: "Productos", href: "/productos" },
    { name: "Ofertas", href: "/ofertas" },
    { name: "Novedades", href: "/novedades" },
    { name: "Laptops", href: "/categorias/laptops" },
    { name: "PCs de Marca", href: "/categorias/pcs-desktop-de-marca" },
    { name: "PCs Ensambladas", href: "/categorias/pcs-ensambladas" },
    { name: "Zona Gaming", href: "/categorias/zona-gaming" },
    { name: "Marcas", href: "/productos?view=brands" },
    { name: "Mi Cuenta", href: "/cuenta" },
    { name: "Mis Pedidos", href: "/cuenta/pedidos" },
  ];

  return (
    <header className="bg-brand-green sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/10 lg:hidden" />}>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white p-0">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="bg-brand-green p-4 flex items-center gap-2 text-white font-bold text-xl">
                <Monitor className="w-6 h-6" />
                <span>TechStore</span>
              </div>
              <nav className="p-4">
                {mobileMenuCategories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2.5 px-3 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-white rounded-md p-1.5 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-brand-green" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
              TechStore
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar laptops, componentes, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-full bg-white border-0 text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white/50 text-sm"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-green-dark hover:bg-emerald-700 text-white p-1.5 rounded-full transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/cuenta" className="hidden sm:flex">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/cuenta" className="hidden sm:flex">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/carrito" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full border-2 border-brand-green">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

