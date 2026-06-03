"use client";

import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-brand-gray">Contáctenos</h1>
        <p className="text-brand-gray-light mt-2">Estamos aquí para ayudarte</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: Phone, title: "Teléfono", info: "(01) 123-4567", sub: "Lun-Sáb 9am-7pm" },
            { icon: MessageCircle, title: "WhatsApp", info: "+51 999 999 999", sub: "Atención inmediata" },
            { icon: Mail, title: "Email", info: "ventas@techstore.pe", sub: "Respuesta en 24h" },
            { icon: MapPin, title: "Dirección", info: "Av. Wilson 123, Lima", sub: "Centro de Lima" },
            { icon: Clock, title: "Horario", info: "Lun-Sáb: 9am-7pm", sub: "Dom: 10am-4pm" },
          ].map((c) => (
            <div key={c.title} className="flex gap-4 p-4 bg-white rounded-xl border hover:border-brand-green transition-colors">
              <div className="w-12 h-12 bg-brand-green-50 rounded-xl flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-gray">{c.title}</h3>
                <p className="text-sm text-brand-green font-medium">{c.info}</p>
                <p className="text-xs text-brand-gray-light">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border p-8">
          <h2 className="text-xl font-bold text-brand-gray mb-6">Envíanos un mensaje</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Nombre</Label><Input placeholder="Tu nombre" className="mt-1" /></div>
              <div><Label>Email</Label><Input type="email" placeholder="tu@email.com" className="mt-1" /></div>
            </div>
            <div><Label>Asunto</Label><Input placeholder="¿En qué podemos ayudarte?" className="mt-1" /></div>
            <div><Label>Mensaje</Label><textarea placeholder="Escribe tu mensaje aquí..." className="mt-1 w-full min-h-[150px] rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green" /></div>
            <Button className="bg-brand-green hover:bg-brand-green-dark text-white rounded-xl px-8"><Send className="w-4 h-4 mr-2" />Enviar Mensaje</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
