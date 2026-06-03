"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 lg:bottom-6 left-4 z-50 bg-brand-green text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-brand-green-dark hover:scale-110 transition-all duration-300 animate-fade-in"
      aria-label="Volver arriba"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
