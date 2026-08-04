import Link from "next/link";
import { Gamepad2, Building2, Monitor } from "lucide-react";

export function ZoneBanners() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Gaming Zone */}
          <Link href="/categorias/zona-gaming" className="group relative overflow-hidden rounded-xl bg-white p-6 border border-zinc-200/90 shadow-xs hover:border-orange-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-44">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest">Línea Especializada</span>
              <h3 className="text-lg font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">Zona Gaming RGB</h3>
              <p className="text-zinc-500 text-xs">Laptops, Periféricos y Componentes RGB de alto rendimiento</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">Ver Productos →</span>
            </div>
          </Link>

          {/* Enterprise Zone */}
          <Link href="/categorias/punto-de-venta-pos" className="group relative overflow-hidden rounded-xl bg-white p-6 border border-zinc-200/90 shadow-xs hover:border-orange-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-44">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest">Soluciones Corporativas</span>
              <h3 className="text-lg font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">Equipos Empresariales & POS</h3>
              <p className="text-zinc-500 text-xs">Workstations, Servidores, Puntos de Venta e Impresoras</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">Ver Catálogo →</span>
            </div>
          </Link>

          {/* Apple Zone */}
          <Link href="/categorias/zona-mac-apple" className="group relative overflow-hidden rounded-xl bg-white p-6 border border-zinc-200/90 shadow-xs hover:border-orange-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-44">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest">Ecosistema Profesional</span>
              <h3 className="text-lg font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">MacBooks & Pantallas Pro</h3>
              <p className="text-zinc-500 text-xs">Equipos de cómputo para diseño, oficina y trabajo exigente</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Monitor className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">Explorar →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}


