"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Categorías", href: "/productos", icon: LayoutGrid },
  { name: "Carrito", href: "/carrito", icon: ShoppingCart },
  { name: "Cuenta", href: "/cuenta", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors relative ${
                isActive
                  ? "text-brand-green"
                  : "text-brand-gray-light hover:text-brand-green"
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.name === "Carrito" && itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-3 bg-brand-red text-white text-[9px] min-w-[16px] h-[16px] flex items-center justify-center p-0 rounded-full border-2 border-white">
                    {itemCount}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
