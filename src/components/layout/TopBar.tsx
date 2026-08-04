import Link from "next/link";
import { Phone, MapPin, ShieldCheck, MessageCircle } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 border-b border-slate-800/80 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <a
            href="https://wa.me/51999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Ventas</span>
          </a>
          <span className="flex items-center gap-1.5 font-medium text-slate-300 hidden md:flex">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            (01) 714-9900 / 999 999 999
          </span>
        </div>

        <div className="flex items-center gap-5 text-slate-300">
          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Garantía 100% Oficial Perú
          </span>
          <Link href="/tiendas" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Tiendas Físicas
          </Link>
          <Link href="/nosotros" className="hover:text-white transition-colors">
            Ayuda / FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}


