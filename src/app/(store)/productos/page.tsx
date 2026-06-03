"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SlidersHorizontal, Grid3X3, List, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function ProductosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(res => res.json()),
      fetch("/api/categories").then(res => res.json()),
      fetch("/api/brands").then(res => res.json()),
    ]).then(([productsData, categoriesData, brandsData]) => {
      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const FiltersSidebar = ({ className = "" }: { className?: string }) => (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="font-bold text-sm text-brand-gray mb-3">Categorías</h3>
        {categories.map((cat) => (
          <label key={cat.id} className="flex items-center gap-2 py-1.5 cursor-pointer">
            <Checkbox />
            <span className="text-sm text-brand-gray-light capitalize">{cat.name}</span>
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-bold text-sm text-brand-gray mb-3">Marcas</h3>
        {brands.map((b) => (
          <label key={b.id} className="flex items-center gap-2 py-1.5 cursor-pointer">
            <Checkbox />
            <span className="text-sm text-brand-gray-light">{b.name}</span>
          </label>
        ))}
      </div>
      <div>
        <h3 className="font-bold text-sm text-brand-gray mb-3">Precio</h3>
        <Slider defaultValue={[0, 10000]} max={10000} step={100} className="mt-4" />
        <div className="flex gap-2 mt-3">
          <Input placeholder="Min" className="h-8 text-xs" />
          <Input placeholder="Max" className="h-8 text-xs" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-gray">Todos los Productos</h1>
          <p className="text-sm text-brand-gray-light mt-1">{products.length} productos encontrados</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="sm" className="lg:hidden" />}>
              <SlidersHorizontal className="w-4 h-4 mr-2" />Filtros
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetTitle>Filtros</SheetTitle>
              <FiltersSidebar className="mt-4" />
            </SheetContent>
          </Sheet>

          <Select defaultValue="relevance">
            <SelectTrigger className="w-44 h-9 text-sm">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevancia</SelectItem>
              <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="newest">Más Nuevos</SelectItem>
            </SelectContent>
          </Select>

          <div className="hidden sm:flex border rounded-lg overflow-hidden">
            <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-brand-green text-white" : "bg-white text-brand-gray-light"}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-brand-green text-white" : "bg-white text-brand-gray-light"}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-60 shrink-0">
          <FiltersSidebar />
        </aside>

        {/* Products */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {products.map((product) => (
                <ProductCard key={product.id} {...product} image={product.images[0]} brand={product.brand?.name} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button variant="outline" size="sm" disabled><ChevronLeft className="w-4 h-4" /></Button>
              <Button size="sm" className="bg-brand-green text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
