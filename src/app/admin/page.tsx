import { prisma } from "@/lib/prisma";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import type { Order, User } from "@prisma/client";

type OrderWithUser = Order & { user: User | null };

export default async function AdminDashboard() {
  const [totalProducts, totalOrders, recentOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
  ]);

  const totalRevenueResult = await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: { not: "CANCELLED" } }
  });
  
  const totalRevenue = totalRevenueResult._sum.total || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gray">Dashboard</h1>
        <p className="text-gray-500 mt-1">Resumen general de tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ingresos Totales</p>
            <h3 className="text-2xl font-bold text-brand-gray">S/. {Number(totalRevenue).toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pedidos Totales</p>
            <h3 className="text-2xl font-bold text-brand-gray">{totalOrders}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Productos Activos</p>
            <h3 className="text-2xl font-bold text-brand-gray">{totalProducts}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Clientes Activos</p>
            <h3 className="text-2xl font-bold text-brand-gray">12</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-brand-gray mb-4">Pedidos Recientes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="pb-3 font-medium">ID Pedido</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Fecha</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((order: OrderWithUser) => (
                  <tr key={order.id}>
                    <td className="py-3 font-medium text-brand-gray">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="py-3 text-gray-600">{order.user?.name || order.userId}</td>
                    <td className="py-3 text-gray-500">{order.createdAt.toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 font-bold">S/. {Number(order.total).toFixed(2)}</td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">No hay pedidos recientes.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
