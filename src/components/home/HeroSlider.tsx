"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Gamepad2, Cpu, Zap, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    badge: "Laptops & Portátiles",
    title: "Laptops Gaming de Alto Rendimiento",
    description: "ASUS ROG, MSI y Lenovo Legion equipadas con Intel Core i9 y AMD Ryzen 9 de última generación.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
    cta: "Ver Laptops",
    href: "/categorias/laptops",
  },
  {
    id: 2,
    badge: "Tarjetas de Video",
    title: "NVIDIA GeForce RTX 40 Series",
    description: "Potencia gráfica sin límites para gaming 4K, renderizado y desarrollo de Inteligencia Artificial.",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
    cta: "Ver Tarjetas",
    href: "/categorias/tarjetas-graficas-nvidia",
  },
  {
    id: 3,
    badge: "Componentes PC",
    title: "Procesadores Intel 14va & Ryzen 7000",
    description: "Workstations y ensamblados de alto desempeño con garantía oficial y soporte técnico directo.",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
    cta: "Ver Procesadores",
    href: "/categorias/procesadores",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative max-w-7xl mx-auto px-4 pt-4">
      <div className="relative rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-xs min-h-[300px] sm:min-h-[360px] md:min-h-[400px]">
        {slides.map((slide, index) => {
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="w-full h-full bg-gradient-to-r from-zinc-50 via-white to-zinc-100 p-6 sm:p-10 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
                  <div className="md:col-span-7 space-y-4">
                    <span className="inline-block bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {slide.badge}
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-zinc-600 text-sm sm:text-base max-w-xl leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="pt-2">
                      <a href={slide.href}>
                        <Button
                          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-7 py-2.5 rounded-lg shadow-sm transition-colors"
                        >
                          {slide.cta} →
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Clean Product Banner Image */}
                  <div className="hidden md:col-span-5 md:flex items-center justify-center h-full">
                    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200/80 shadow-xs">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-zinc-800 p-2 rounded-full border border-zinc-200 shadow-sm transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-zinc-800 p-2 rounded-full border border-zinc-200 shadow-sm transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                index === current ? "bg-orange-600 w-7" : "bg-zinc-300 w-2 hover:bg-zinc-400"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


