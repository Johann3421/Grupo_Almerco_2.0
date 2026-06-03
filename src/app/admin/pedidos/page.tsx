import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { Eye } from "lucide-react";

type OrderWithDetails = Prisma.OrderGetPayload<{
  include: { user: true; items: { include: { product: true } } };
}>;

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  PROCESSING: "En Proceso",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-gray">Pedidos</h1>
        <p className="text-gray-500 mt-1">{orders.length} pedidos en total</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(statusLabels).map(([key, label]) => {
          const count = orders.filter((o: OrderWithDetails) => o.status === key).length;
          return (
            <div key={key} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-brand-gray">{count}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b text-gray-500">
              <th className="px-6 py-4 font-medium"># Pedido</th>
              <th className="px-6 py-4 font-medium">Cliente</th>
              <th className="px-6 py-4 font-medium">Productos</th>
              <th className="px-6 py-4 font-medium">Fecha</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order: OrderWithDetails) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-brand-gray text-xs">
                  #{order.id.slice(-8).toUpperCase()}
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-brand-gray">{order.user?.name || "—"}</p>
                  <p className="text-xs text-gray-500">{order.user?.email}</p>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {order.items.length} {order.items.length === 1 ? "ítem" : "ítems"}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {order.createdAt.toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-brand-gray">
                  S/. {Number(order.total).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/pedidos/${order.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-brand-green hover:text-brand-green-dark font-medium"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-400">
                  No hay pedidos registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
