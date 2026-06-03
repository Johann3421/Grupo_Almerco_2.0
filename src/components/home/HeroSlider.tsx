"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Laptops Gaming",
    subtitle: "Las mejores marcas a los mejores precios",
    description: "Hasta 30% de descuento en laptops ASUS ROG, MSI y Lenovo Legion",
    bg: "from-brand-green via-emerald-600 to-teal-700",
    emoji: "🎮",
    cta: "Ver Ofertas",
    href: "/ofertas",
  },
  {
    id: 2,
    title: "Tarjetas Gráficas RTX 40 Series",
    subtitle: "Rendimiento extremo para gaming y creación",
    description: "NVIDIA GeForce RTX 4070, 4080 y 4090 disponibles",
    bg: "from-gray-900 via-gray-800 to-brand-green-dark",
    emoji: "🖥️",
    cta: "Comprar Ahora",
    href: "/categorias/tarjetas-graficas-nvidia",
  },
  {
    id: 3,
    title: "Procesadores de Última Generación",
    subtitle: "Intel Core i9 & AMD Ryzen 9",
    description: "Máximo rendimiento para gaming y productividad profesional",
    bg: "from-blue-900 via-indigo-800 to-brand-green",
    emoji: "⚡",
    cta: "Explorar",
    href: "/categorias/procesadores",
  },
  {
    id: 4,
    title: "Envío Gratis a Todo el Perú",
    subtitle: "En compras mayores a S/. 500",
    description: "Recibe tu pedido en 24-48 horas en Lima y 3-5 días a provincias",
    bg: "from-brand-green via-emerald-500 to-green-400",
    emoji: "🚚",
    cta: "Ver Productos",
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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[300px] sm:h-[400px] md:h-[480px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === current
                ? "opacity-100 translate-x-0"
                : index < current
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div
              className={`w-full h-full bg-gradient-to-r ${slide.bg} flex items-center`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="text-white space-y-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full font-semibold">
                      {slide.subtitle}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-white/90 text-base sm:text-lg max-w-md">
                      {slide.description}
                    </p>
                    <a href={slide.href}>
                      <Button
                        size="lg"
                        className="bg-white text-brand-green hover:bg-white/90 font-bold mt-2 rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
                      >
                        {slide.cta}
                      </Button>
                    </a>
                  </div>
                  <div className="hidden md:flex items-center justify-center">
                    <span className="text-[120px] lg:text-[160px] animate-float">
                      {slide.emoji}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
