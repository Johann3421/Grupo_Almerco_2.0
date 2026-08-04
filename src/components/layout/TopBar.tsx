import Link from "next/link";
import { Phone, MapPin, ShieldCheck, Clock } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            Ventas: (01) 714-9900 / 999 999 999
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 hidden md:flex">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Lun - Sáb: 9:00am - 7:00pm
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1 font-medium text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Garantía Oficial Perú
          </span>
          <Link href="/tiendas" className="flex items-center gap-1 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
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

