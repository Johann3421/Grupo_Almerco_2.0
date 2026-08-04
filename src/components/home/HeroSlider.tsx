"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Gamepad2, Cpu, Zap, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Laptops Gaming de Alto Rendimiento",
    subtitle: "Las mejores marcas con garantía oficial",
    description: "ASUS ROG, MSI y Lenovo Legion con procesadores Intel y AMD de última generación",
    bg: "from-slate-900 via-slate-800 to-emerald-950",
    icon: Gamepad2,
    cta: "Ver Catálogo",
    href: "/ofertas",
  },
  {
    id: 2,
    title: "Tarjetas Gráficas RTX 40 Series",
    subtitle: "Rendimiento extremo para gaming y desarrollo",
    description: "NVIDIA GeForce RTX 4070, 4080 y 4090 con entrega inmediata",
    bg: "from-slate-950 via-zinc-900 to-slate-900",
    icon: Cpu,
    cta: "Ver Tarjetas",
    href: "/categorias/tarjetas-graficas-nvidia",
  },
  {
    id: 3,
    title: "Procesadores de Última Generación",
    subtitle: "Intel Core i9 & AMD Ryzen 9",
    description: "Potencia sin límites para workstations y PCs de alto desempeño",
    bg: "from-blue-950 via-slate-900 to-emerald-950",
    icon: Zap,
    cta: "Ver Procesadores",
    href: "/categorias/procesadores",
  },
  {
    id: 4,
    title: "Envíos a Nivel Nacional",
    subtitle: "Despacho directo y seguro",
    description: "Atención personalizada y entregas express en Lima y provincias",
    bg: "from-emerald-950 via-emerald-900 to-slate-900",
    icon: Truck,
    cta: "Conocer Más",
    href: "/productos",
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
    <section className="relative overflow-hidden bg-slate-950">
      <div className="relative h-[280px] sm:h-[360px] md:h-[420px]">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className={`w-full h-full bg-gradient-to-r ${slide.bg} flex items-center`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 text-white space-y-3">
                      <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded font-medium">
                        {slide.subtitle}
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                        {slide.title}
                      </h2>
                      <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                        {slide.description}
                      </p>
                      <div className="pt-2">
                        <a href={slide.href}>
                          <Button
                            size="sm"
                            className="bg-brand-green hover:bg-emerald-600 text-white font-semibold rounded px-6 py-2 shadow-sm text-sm"
                          >
                            {slide.cta}
                          </Button>
                        </a>
                      </div>
                    </div>
                    <div className="hidden md:col-span-4 md:flex items-center justify-center">
                      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-emerald-400">
                        <Icon className="w-24 h-24 stroke-[1.25]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === current ? "bg-emerald-500 w-6" : "bg-slate-700 w-2"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

