"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, Share2, ChevronRight, Star, Minus, Plus, Truck, Shield, RotateCcw, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { ProductCard } from "@/components/products/ProductCard";

export default function ProductoDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    // Fetch product details
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProduct(data);
          // Fetch related products
          fetch(`/api/products?category=${data.category?.slug}`)
            .then(r => r.json())
            .then(related => {
              if (Array.isArray(related)) {
                setRelatedProducts(related.filter((p: any) => p.id !== data.id).slice(0, 4));
              }
            });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-zinc-900">Producto no encontrado</h1>
        <p className="text-zinc-500 mb-6 text-sm">El producto que buscas no existe o ha sido movido.</p>
        <Link href="/productos">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6">
            Volver al catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const numPrice = Number(product.price);
  const numComparePrice = product.comparePrice ? Number(product.comparePrice) : null;
  const discount = numComparePrice ? Math.round(((numComparePrice - numPrice) / numComparePrice) * 100) : 0;

  const currentImg = product.images?.[selectedImage] || product.images?.[0] || "";
  const isUrl = currentImg && (currentImg.startsWith("http") || currentImg.startsWith("/"));

  const handleAdd = () => {
    addItem({ 
      id: product.id, 
      name: product.name, 
      slug: product.slug, 
      price: numPrice, 
      comparePrice: numComparePrice ?? undefined, 
      image: currentImg, 
      quantity: qty, 
      stock: product.stock 
    });
    toast.success("Agregado al carrito", { description: `${qty}x ${product.name}` });
  };

  const specs = product.specs ? (typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs) : {};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-orange-600 transition-colors">Inicio</Link>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <Link href="/productos" className="hover:text-orange-600 transition-colors">Productos</Link>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        {product.category && (
          <>
            <Link href={`/categorias/${product.category.slug}`} className="hover:text-orange-600 transition-colors">
              {product.category.name}
            </Link>
            <ChevronRight className="w-3 h-3 text-zinc-400" />
          </>
        )}
        <span className="text-zinc-900 font-medium truncate max-w-[240px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-6 lg:p-8 rounded-2xl border border-zinc-200 shadow-xs">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="bg-zinc-50 rounded-xl aspect-square flex items-center justify-center p-6 border border-zinc-200/80 relative overflow-hidden">
            {isUrl ? (
              <img 
                src={currentImg} 
                alt={product.name} 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            ) : currentImg && currentImg.length < 5 ? (
              <span className="text-[100px]">{currentImg}</span>
            ) : (
              <Package className="w-24 h-24 text-zinc-300" />
            )}

            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && <Badge className="bg-blue-600 text-white font-bold text-[10px]">NUEVO</Badge>}
              {product.isOffer && discount > 0 && <Badge className="bg-red-600 text-white font-bold text-[10px]">OFERTA -{discount}%</Badge>}
            </div>
          </div>

          {/* Image thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img: string, i: number) => {
                const thumbIsUrl = img && (img.startsWith("http") || img.startsWith("/"));
                return (
                  <button 
                    key={i} 
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg bg-zinc-50 flex items-center justify-center border-2 transition-all p-1 overflow-hidden shrink-0 ${
                      i === selectedImage ? "border-orange-600 shadow-xs" : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {thumbIsUrl ? (
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xl">{img}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            {product.brand && (
              <span className="text-xs font-bold text-orange-600 tracking-wider uppercase bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                {product.brand.name}
              </span>
            )}
            
            <h1 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 leading-snug tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-medium text-zinc-500">
                ({product.reviews?.length || 0} valoraciones de clientes)
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-xs text-zinc-400 font-mono">SKU: {product.sku}</span>
            </div>

            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-zinc-900">S/ {numPrice.toFixed(2)}</span>
              {numComparePrice && numComparePrice > numPrice && (
                <span className="text-lg text-zinc-400 line-through font-medium">S/ {numComparePrice.toFixed(2)}</span>
              )}
            </div>

            <div className="inline-flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
              <span className={`text-xs font-bold ${product.stock > 0 ? "text-emerald-700" : "text-red-600"}`}>
                {product.stock > 0 ? `Stock Disponible (${product.stock} unidades)` : "Agotado temporalmente"}
              </span>
            </div>
          </div>

          <Separator className="bg-zinc-100" />

          {/* Action section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Cantidad:</span>
              <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))} 
                  className="p-2 hover:bg-zinc-200 text-zinc-700 transition-colors rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-zinc-900 text-sm">{qty}</span>
                <button 
                  onClick={() => setQty(Math.min(product.stock, qty + 1))} 
                  className="p-2 hover:bg-zinc-200 text-zinc-700 transition-colors rounded-r-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleAdd} 
                disabled={product.stock === 0} 
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-12 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Carrito
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-zinc-200 hover:border-orange-600 hover:text-orange-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-zinc-200 hover:border-orange-600 hover:text-orange-600">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Trust features */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center text-center p-3 bg-zinc-50 rounded-xl border border-zinc-100">
              <Truck className="w-5 h-5 text-orange-600 mb-1" />
              <span className="text-[11px] font-semibold text-zinc-800">Envío a Todo el Perú</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-zinc-50 rounded-xl border border-zinc-100">
              <Shield className="w-5 h-5 text-orange-600 mb-1" />
              <span className="text-[11px] font-semibold text-zinc-800">Garantía Oficial</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-zinc-50 rounded-xl border border-zinc-100">
              <RotateCcw className="w-5 h-5 text-orange-600 mb-1" />
              <span className="text-[11px] font-semibold text-zinc-800">Soporte Técnico</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 bg-white p-6 lg:p-8 rounded-2xl border border-zinc-200 shadow-xs">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b border-zinc-200 rounded-none bg-transparent h-auto p-0 gap-8">
            <TabsTrigger 
              value="description" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 px-0 pb-3 font-bold text-sm text-zinc-600"
            >
              Descripción del Producto
            </TabsTrigger>
            {Object.keys(specs).length > 0 && (
              <TabsTrigger 
                value="specs" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 px-0 pb-3 font-bold text-sm text-zinc-600"
              >
                Especificaciones Técnicas
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="reviews" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:text-orange-600 px-0 pb-3 font-bold text-sm text-zinc-600"
            >
              Reseñas y Opiniones ({product.reviews?.length || 0})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="py-6">
            <p className="text-zinc-600 leading-relaxed text-sm max-w-4xl whitespace-pre-line">
              {product.description || "Sin descripción disponible para este producto."}
            </p>
          </TabsContent>

          {Object.keys(specs).length > 0 && (
            <TabsContent value="specs" className="py-6">
              <div className="max-w-2xl border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-100">
                {Object.entries(specs).map(([key, value], i) => (
                  <div key={key} className={`flex py-3 px-4 text-xs ${i % 2 === 0 ? "bg-zinc-50" : "bg-white"}`}>
                    <span className="font-bold text-zinc-900 w-48 shrink-0">{key}</span>
                    <span className="text-zinc-600">{value as React.ReactNode}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}

          <TabsContent value="reviews" className="py-6">
            {product.reviews?.length > 0 ? (
              <div className="space-y-4 max-w-2xl">
                {product.reviews.map((r: any) => (
                  <div key={r.id} className="border border-zinc-100 p-4 rounded-xl bg-zinc-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-zinc-900">{r.userName || "Usuario Verificado"}</span>
                      <div className="flex text-amber-500">
                        {Array.from({length: r.rating || 5}).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-zinc-500">Aún no hay opiniones grabadas para este producto.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-zinc-900 mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard 
                key={p.id} 
                {...p} 
                image={Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : ""} 
                brand={p.brand?.name} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
