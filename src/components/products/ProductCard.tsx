"use client";

import Link from "next/link";
import { ShoppingCart, Eye, Heart, Star, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  image: string;
  brand?: string;
  stock: number;
  isNew?: boolean;
  isOffer?: boolean;
}

export function ProductCard({
  id, name, slug, price, comparePrice, image, brand, stock, isNew, isOffer,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const numPrice = Number(price);
  const numComparePrice = comparePrice ? Number(comparePrice) : null;
  const discount = numComparePrice ? Math.round(((numComparePrice - numPrice) / numComparePrice) * 100) : 0;

  const isImageUrl = image && (image.startsWith("http") || image.startsWith("/"));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, slug, price: numPrice, comparePrice: numComparePrice ?? undefined, image, quantity: 1, stock });
    toast.success("Producto agregado al carrito", { description: name });
  };

  return (
    <div className="product-card group bg-white rounded-lg border border-slate-200 overflow-hidden relative flex flex-col justify-between">
      {/* Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {isNew && <Badge className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5">NUEVO</Badge>}
        {isOffer && discount > 0 && <Badge className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5">-{discount}%</Badge>}
      </div>

      {/* Wishlist */}
      <button 
        aria-label="Agregar a favoritos"
        className="absolute top-2.5 right-2.5 z-10 text-slate-400 hover:text-red-500 bg-white/80 p-1.5 rounded-full border border-slate-200 shadow-xs transition-colors"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <Link href={`/producto/${slug}`}>
        <div className="aspect-square bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
          {isImageUrl ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : image && image.length < 4 ? (
            <span className="text-5xl">{image}</span>
          ) : (
            <Package className="w-12 h-12 text-slate-300" />
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-1 justify-between space-y-2">
        <div>
          {brand && <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">{brand}</p>}
          <Link href={`/producto/${slug}`}>
            <h3 className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-2 hover:text-emerald-600 transition-colors leading-snug">
              {name}
            </h3>
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-2">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">S/ {numPrice.toFixed(2)}</span>
            {numComparePrice && numComparePrice > numPrice && (
              <span className="text-xs text-slate-400 line-through">S/ {numComparePrice.toFixed(2)}</span>
            )}
          </div>

          {/* Stock */}
          <p className={`text-[11px] font-medium ${stock > 0 ? "text-emerald-700" : "text-red-600"}`}>
            {stock > 0 ? `Disponible (${stock} un.)` : "Agotado"}
          </p>

          {/* Actions */}
          <div className="flex gap-1.5 pt-1">
            <Button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 rounded"
              size="sm"
            >
              <ShoppingCart className="w-3.5 h-3.5 mr-1" />
              Agregar
            </Button>
            <Link href={`/producto/${slug}`}>
              <Button variant="outline" size="sm" className="h-8 px-2.5 rounded border-slate-200 hover:border-emerald-600 hover:text-emerald-600">
                <Eye className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

