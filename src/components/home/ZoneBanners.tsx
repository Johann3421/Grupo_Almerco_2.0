import Link from "next/link";
import { Gamepad2, Building2, Apple } from "lucide-react";

export function ZoneBanners() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gaming Zone */}
          <Link href="/categorias/zona-gaming" className="group relative overflow-hidden rounded-2xl h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black gaming-rgb" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Zona</span>
                <h3 className="text-3xl font-bold text-white mt-1">Gaming</h3>
                <p className="text-white/70 mt-2 text-sm">PlayStation • Xbox • Nintendo • PC Gaming</p>
              </div>
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8 text-purple-400" />
                <span className="text-white/80 text-sm group-hover:text-white transition-colors">Explorar →</span>
              </div>
            </div>
          </Link>

          {/* Enterprise Zone */}
          <Link href="/categorias/punto-de-venta-pos" className="group relative overflow-hidden rounded-2xl h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Zona</span>
                <h3 className="text-3xl font-bold text-white mt-1">Empresarial</h3>
                <p className="text-white/70 mt-2 text-sm">Servidores • Workstations • POS • Redes</p>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-blue-400" />
                <span className="text-white/80 text-sm group-hover:text-white transition-colors">Explorar →</span>
              </div>
            </div>
          </Link>

          {/* Apple Zone */}
          <Link href="/categorias/zona-mac-apple" className="group relative overflow-hidden rounded-2xl h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-200" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Zona</span>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">Apple</h3>
                <p className="text-gray-500 mt-2 text-sm">iPhone • iPad • MacBook • AirPods • Watch</p>
              </div>
              <div className="flex items-center gap-3">
                <Apple className="w-8 h-8 text-gray-700" />
                <span className="text-gray-600 text-sm group-hover:text-black transition-colors">Explorar →</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
