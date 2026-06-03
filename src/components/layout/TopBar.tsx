"use client";

import { Truck, Laptop, Camera, Wifi, Package } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-brand-green-dark text-white text-xs py-1.5 overflow-hidden relative z-50">
      <div className="marquee-container">
        <div className="marquee-content gap-16">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 animate-bounce" />
                Realizamos envíos diarios a todo el país
              </span>
              <span className="flex items-center gap-2">
                <Laptop className="w-4 h-4 animate-pulse" />
                Las mejores marcas en tecnología
              </span>
              <span className="flex items-center gap-2">
                <Camera className="w-4 h-4 animate-bounce" />
                Garantía oficial en todos los productos
              </span>
              <span className="flex items-center gap-2">
                <Wifi className="w-4 h-4 animate-pulse" />
                Atención online 24/7
              </span>
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4 animate-bounce" />
                Envíos Express a Lima Metropolitana
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
