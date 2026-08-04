import Link from "next/link";
import { Gamepad2, Building2, Monitor } from "lucide-react";

export function ZoneBanners() {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gaming Zone */}
          <Link href="/categorias/zona-gaming" className="group relative overflow-hidden rounded-lg bg-slate-900 p-6 border border-slate-800 flex flex-col justify-between h-48">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Categoría Específica</span>
              <h3 className="text-xl font-bold text-white">Zona Gaming</h3>
              <p className="text-slate-400 text-xs">Laptops, Periféricos y Componentes RGB</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <Gamepad2 className="w-6 h-6 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">Ver Productos →</span>
            </div>
          </Link>

          {/* Enterprise Zone */}
          <Link href="/categorias/punto-de-venta-pos" className="group relative overflow-hidden rounded-lg bg-slate-900 p-6 border border-slate-800 flex flex-col justify-between h-48">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Soluciones Cobertura</span>
              <h3 className="text-xl font-bold text-white">Equipos Empresariales</h3>
              <p className="text-slate-400 text-xs">Workstations, Servidores y Puntos POS</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <Building2 className="w-6 h-6 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">Ver Catálogo →</span>
            </div>
          </Link>

          {/* Apple Zone */}
          <Link href="/categorias/zona-mac-apple" className="group relative overflow-hidden rounded-lg bg-slate-900 p-6 border border-slate-800 flex flex-col justify-between h-48">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Ecosistema</span>
              <h3 className="text-xl font-bold text-white">Laptops & Monitores</h3>
              <p className="text-slate-400 text-xs">Equipos de cómputo para oficina y hogar</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <Monitor className="w-6 h-6 text-slate-300" />
              <span className="text-xs font-semibold text-slate-300 group-hover:translate-x-1 transition-transform">Explorar →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

