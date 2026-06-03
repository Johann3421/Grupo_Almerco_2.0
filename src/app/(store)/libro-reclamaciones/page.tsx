"use client";

import { BookOpen, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LibroReclamacionesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <BookOpen className="w-12 h-12 text-brand-green mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-brand-gray">Libro de Reclamaciones</h1>
        <p className="text-brand-gray-light mt-2">Conforme al Código de Protección y Defensa del Consumidor</p>
      </div>

      <div className="bg-white rounded-2xl border p-8">
        <form className="space-y-6">
          <div>
            <h2 className="font-bold text-lg text-brand-gray mb-4">1. Datos del Consumidor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Nombre Completo *</Label><Input placeholder="Juan Pérez García" className="mt-1" required /></div>
              <div><Label>DNI / CE *</Label><Input placeholder="12345678" className="mt-1" required /></div>
              <div><Label>Email *</Label><Input type="email" placeholder="correo@ejemplo.com" className="mt-1" required /></div>
              <div><Label>Teléfono *</Label><Input placeholder="+51 999 999 999" className="mt-1" required /></div>
              <div className="sm:col-span-2"><Label>Dirección</Label><Input placeholder="Tu dirección" className="mt-1" /></div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg text-brand-gray mb-4">2. Tipo de Reclamo</h2>
            <Select>
              <SelectTrigger><SelectValue placeholder="Selecciona el tipo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="reclamo">Reclamo (disconformidad con el producto/servicio)</SelectItem>
                <SelectItem value="queja">Queja (malestar respecto a la atención)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="font-bold text-lg text-brand-gray mb-4">3. Detalle</h2>
            <div className="space-y-4">
              <div><Label>Número de Pedido</Label><Input placeholder="TS-XXXXXX" className="mt-1" /></div>
              <div><Label>Descripción del Reclamo *</Label><textarea placeholder="Describe detalladamente tu reclamo..." className="mt-1 w-full min-h-[120px] rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" required /></div>
              <div><Label>Pedido del Consumidor</Label><textarea placeholder="¿Qué solución esperas?" className="mt-1 w-full min-h-[80px] rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" /></div>
            </div>
          </div>

          <div className="bg-brand-green-50 p-4 rounded-xl text-sm text-brand-gray-light">
            <p>La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.</p>
            <p className="mt-2">El proveedor deberá dar respuesta al reclamo en un plazo no mayor a 30 días calendario.</p>
          </div>

          <Button className="w-full bg-brand-green hover:bg-brand-green-dark text-white h-12 rounded-xl font-bold">
            <Send className="w-4 h-4 mr-2" />Enviar Reclamo
          </Button>
        </form>
      </div>
    </div>
  );
}
