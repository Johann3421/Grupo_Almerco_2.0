import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Search } from "lucide-react";

export default async function AdminProductosPage() {
  const products = await prisma.product.findMany({
    include: { category: true, brand: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-gray">Inventario</h1>
          <p className="text-gray-500 mt-1">{products.length} productos en total</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Buscar producto por nombre, SKU o categoría..."
          className="flex-1 text-sm outline-none text-brand-gray placeholder:text-gray-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b text-gray-500">
              <th className="px-6 py-4 font-medium">Producto</th>
              <th className="px-6 py-4 font-medium">SKU</th>
              <th className="px-6 py-4 font-medium">Categoría</th>
              <th className="px-6 py-4 font-medium">Marca</th>
              <th className="px-6 py-4 font-medium">Precio</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium">Estado</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl shrink-0">
                      {product.images[0] || "📦"}
                    </div>
                    <span className="font-medium text-brand-gray max-w-[220px] truncate">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{product.sku}</td>
                <td className="px-6 py-4 text-gray-600">{product.category.name}</td>
                <td className="px-6 py-4 text-gray-600">{product.brand.name}</td>
                <td className="px-6 py-4 font-semibold text-brand-gray">
                  S/. {Number(product.price).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${product.stock <= 5 ? "text-red-600" : product.stock <= 15 ? "text-yellow-600" : "text-green-600"}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {product.isActive && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Activo</span>
                    )}
                    {product.isOffer && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Oferta</span>
                    )}
                    {product.isNew && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Nuevo</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/productos/${product.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-brand-green hover:text-brand-green-dark font-medium"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-400">
                  No hay productos. Crea el primero.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
