"use client";

import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getTotal, couponCode, couponDiscount } = useCartStore();
  const subtotal = getSubtotal();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-brand-gray mb-2">Tu carrito está vacío</h1>
        <p className="text-brand-gray-light mb-6">¡Agrega productos para comenzar!</p>
        <Link href="/productos">
          <Button className="bg-brand-green hover:bg-brand-green-dark text-white rounded-xl px-8">Ver Productos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-gray mb-6">Carrito de Compras ({items.length} productos)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-4xl">{item.image}</span>
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/producto/${item.slug}`} className="text-sm font-semibold text-brand-gray hover:text-brand-green line-clamp-2">{item.name}</Link>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-bold text-brand-green">S/. {Number(item.price).toFixed(2)}</span>
                  {item.comparePrice && <span className="text-xs text-brand-gray-light line-through">S/. {Number(item.comparePrice).toFixed(2)}</span>}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gray-50"><Minus className="w-3 h-3" /></button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gray-50"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-brand-gray">S/. {(Number(item.price) * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-brand-gray-light hover:text-brand-red transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={clearCart} className="text-brand-red border-brand-red/30 hover:bg-red-50">Vaciar Carrito</Button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 h-fit sticky top-24 space-y-4">
          <h2 className="font-bold text-lg text-brand-gray">Resumen del Pedido</h2>
          <Separator />
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-brand-gray-light">Subtotal</span><span className="font-semibold">S/. {Number(subtotal).toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-brand-gray-light">Envío</span><span className="text-brand-green font-semibold">Gratis</span></div>
            {couponDiscount > 0 && <div className="flex justify-between text-brand-green"><span>Descuento ({couponCode})</span><span>-S/. {Number(couponDiscount).toFixed(2)}</span></div>}
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-brand-green">S/. {Number(total).toFixed(2)}</span></div>

          {/* Coupon */}
          <div className="flex gap-2">
            <Input placeholder="Código de cupón" className="h-9 text-sm" />
            <Button variant="outline" size="sm" className="shrink-0"><Tag className="w-4 h-4" /></Button>
          </div>

          <Link href="/checkout" className="block">
            <Button className="w-full bg-brand-green hover:bg-brand-green-dark text-white h-12 rounded-xl text-base font-bold">
              Proceder al Pago <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/productos" className="block text-center text-sm text-brand-green hover:underline">← Seguir Comprando</Link>
        </div>
      </div>
    </div>
  );
}
