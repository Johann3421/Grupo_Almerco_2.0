"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Truck, CheckCircle, ArrowLeft, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

const steps = ["Envío", "Pago", "Confirmación"];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { items, getSubtotal, getTotal, clearCart } = useCartStore();

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })),
          total: getTotal(),
          userId: "user_placeholder_123", // Reemplazar con ID de NextAuth cuando esté listo
          shippingAddress: "...",
          paymentMethod: "...",
        }),
      });

      if (response.ok) {
        setStep(2);
        clearCart();
        toast.success("¡Pedido realizado con éxito!");
      } else {
        toast.error("Hubo un error al procesar el pedido.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión al procesar el pedido.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-brand-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-brand-green" />
        </div>
        <h1 className="text-3xl font-bold text-brand-gray mb-3">¡Pedido Confirmado!</h1>
        <p className="text-brand-gray-light mb-2">Tu pedido #TS-{Date.now().toString().slice(-6)} ha sido procesado exitosamente.</p>
        <p className="text-brand-gray-light mb-8">Recibirás un email de confirmación con los detalles de tu pedido.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/"><Button variant="outline" className="rounded-xl">Volver al Inicio</Button></Link>
          <Link href="/productos"><Button className="bg-brand-green hover:bg-brand-green-dark text-white rounded-xl">Seguir Comprando</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Steps */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? "bg-brand-green text-white" : "bg-gray-200 text-gray-500"}`}>{i + 1}</div>
            <span className={`text-sm font-semibold ${i <= step ? "text-brand-green" : "text-gray-400"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`w-12 h-0.5 ${i < step ? "bg-brand-green" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-brand-green" />
                <h2 className="text-xl font-bold text-brand-gray">Dirección de Envío</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Nombre Completo</Label><Input placeholder="Juan Pérez" className="mt-1" /></div>
                <div><Label>Teléfono</Label><Input placeholder="+51 999 999 999" className="mt-1" /></div>
                <div className="sm:col-span-2"><Label>Dirección</Label><Input placeholder="Av. Principal 123, Dpto 4B" className="mt-1" /></div>
                <div><Label>Ciudad</Label><Input placeholder="Lima" className="mt-1" /></div>
                <div><Label>Distrito</Label><Input placeholder="Miraflores" className="mt-1" /></div>
                <div><Label>Departamento</Label><Input placeholder="Lima" className="mt-1" /></div>
                <div><Label>Referencia</Label><Input placeholder="Cerca al parque Kennedy" className="mt-1" /></div>
              </div>
              <div className="flex justify-between pt-4">
                <Link href="/carrito"><Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" />Volver al Carrito</Button></Link>
                <Button onClick={() => setStep(1)} className="bg-brand-green hover:bg-brand-green-dark text-white">Continuar al Pago</Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-brand-green" />
                <h2 className="text-xl font-bold text-brand-gray">Método de Pago</h2>
              </div>
              <div className="space-y-3">
                {["Tarjeta de Crédito/Débito", "Transferencia Bancaria", "Yape / Plin", "Contra entrega"].map((method) => (
                  <label key={method} className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-brand-green transition-colors">
                    <input type="radio" name="payment" className="accent-brand-green" defaultChecked={method === "Tarjeta de Crédito/Débito"} />
                    <span className="font-medium text-brand-gray">{method}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(0)} disabled={loading}><ArrowLeft className="w-4 h-4 mr-2" />Volver</Button>
                <Button onClick={handlePlaceOrder} disabled={loading} className="bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8">
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Procesando...</> : "Confirmar Pedido"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl border p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg text-brand-gray mb-4">Resumen</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm">
                <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center shrink-0"><span className="text-xl">{item.image}</span></div>
                <div className="flex-1 min-w-0">
                  <p className="text-brand-gray truncate font-medium">{item.name}</p>
                  <p className="text-brand-gray-light">{item.quantity} × S/. {Number(item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-brand-gray-light">Subtotal</span><span>S/. {Number(getSubtotal()).toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-brand-gray-light">Envío</span><span className="text-brand-green">Gratis</span></div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-brand-green">S/. {Number(getTotal()).toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
