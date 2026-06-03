"use client";

import Link from "next/link";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";
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
  brand: string;
  stock: number;
  isNew?: boolean;
  isOffer?: boolean;
}

export function ProductCard({
  id, name, slug, price, comparePrice, image, brand, stock, isNew, isOffer,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  // Prisma Decimal fields are serialized as strings in JSON, convert to number
  const numPrice = Number(price);
  const numComparePrice = comparePrice ? Number(comparePrice) : null;
  const discount = numComparePrice ? Math.round(((numComparePrice - numPrice) / numComparePrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, slug, price: numPrice, comparePrice: numComparePrice ?? undefined, image, quantity: 1, stock });
    toast.success("Producto agregado al carrito", { description: name });
  };

  return (
    <div className="product-card group bg-white rounded-xl border border-gray-100 overflow-hidden relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {isNew && <Badge className="bg-brand-blue text-white text-[10px] font-bold">NUEVO</Badge>}
        {isOffer && discount > 0 && <Badge className="bg-brand-red text-white text-[10px] font-bold">-{discount}%</Badge>}
      </div>

      {/* Wishlist */}
      <button className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1.5 shadow-md hover:text-brand-red">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <Link href={`/producto/${slug}`}>
        <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{image}</span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-brand-green font-semibold uppercase">{brand}</p>
        <Link href={`/producto/${slug}`}>
          <h3 className="text-sm font-semibold text-brand-gray line-clamp-2 hover:text-brand-green transition-colors leading-snug min-h-[2.5rem]">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3 h-3 fill-brand-orange text-brand-orange" />
          ))}
          <span className="text-xs text-brand-gray-light ml-1">(12)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-brand-green">S/. {numPrice.toFixed(2)}</span>
          {numComparePrice && numComparePrice > numPrice && (
            <span className="text-sm text-brand-gray-light line-through">S/. {numComparePrice.toFixed(2)}</span>
          )}
        </div>

        {/* Stock */}
        <p className={`text-xs ${stock > 0 ? "text-brand-green" : "text-brand-red"}`}>
          {stock > 0 ? `${stock} en stock` : "Agotado"}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white text-xs h-9 rounded-lg"
            size="sm"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            Agregar
          </Button>
          <Link href={`/producto/${slug}`}>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded-lg border-gray-200 hover:border-brand-green hover:text-brand-green">
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
