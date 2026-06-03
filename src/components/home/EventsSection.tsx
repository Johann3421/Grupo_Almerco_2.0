"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const events = [
  { id: 1, title: "Review: ASUS ROG Strix G16", thumbnail: "🎮", videoId: "dQw4w9WgXcQ", color: "from-purple-600 to-pink-600" },
  { id: 2, title: "Armando la PC Gaming Perfecta 2024", thumbnail: "🖥️", videoId: "dQw4w9WgXcQ", color: "from-blue-600 to-cyan-600" },
  { id: 3, title: "Top 10 Periféricos Gaming", thumbnail: "⌨️", videoId: "dQw4w9WgXcQ", color: "from-brand-green to-emerald-600" },
  { id: 4, title: "TechStore Feria Tecnológica 2024", thumbnail: "🎪", videoId: "dQw4w9WgXcQ", color: "from-orange-500 to-red-600" },
];

export function EventsSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray">Nuestros Eventos</h2>
          <p className="mt-3 text-brand-gray-light text-lg">Contenido exclusivo y reviews</p>
          <div className="w-20 h-1 bg-brand-green mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <button key={event.id} onClick={() => setActiveVideo(event.videoId)} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all text-left">
              <div className={`bg-gradient-to-br ${event.color} aspect-video flex items-center justify-center`}>
                <span className="text-6xl">{event.thumbnail}</span>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-brand-gray ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-sm font-semibold text-brand-gray line-clamp-2 group-hover:text-brand-green transition-colors">{event.title}</h3>
              </div>
            </button>
          ))}
        </div>
        <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
            <DialogTitle className="sr-only">Video</DialogTitle>
            <div className="aspect-video">
              {activeVideo && <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
