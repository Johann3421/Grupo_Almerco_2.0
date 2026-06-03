import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin Panel | TechStore",
  description: "Panel de administración de TechStore",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-gray text-white flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold text-brand-green">TechStore</Link>
          <span className="text-xs text-gray-400 block mt-1">Panel Administrativo</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/pedidos" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>Pedidos</span>
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
            <Package className="w-5 h-5" />
            <span>Inventario</span>
          </Link>
          <Link href="/admin/clientes" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
            <Users className="w-5 h-5" />
            <span>Clientes</span>
          </Link>
          <Link href="/admin/configuracion" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10">
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
