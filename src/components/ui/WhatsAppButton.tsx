"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/51999999999?text=Hola%2C%20necesito%20asesoría"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 lg:bottom-6 right-4 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-brand-gray text-sm px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ¿Necesitas ayuda?
      </span>
    </a>
  );
}
