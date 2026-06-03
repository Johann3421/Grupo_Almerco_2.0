"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, Share2, ChevronRight, Star, Minus, Plus, Truck, Shield, RotateCcw, Loader2 } from "lucide-react";
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
          // Fetch related products (mock logic: just fetch some products)
          fetch(`/api/products?category=${data.category?.slug}`)
            .then(r => r.json())
            .then(related => {
              setRelatedProducts(related.filter((p: any) => p.id !== data.id).slice(0, 4));
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
        <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <Link href="/productos">
          <Button className="bg-brand-green text-white">Volver al catálogo</Button>
        </Link>
      </div>
    );
  }

  const numPrice = Number(product.price);
  const numComparePrice = product.comparePrice ? Number(product.comparePrice) : null;
  const discount = numComparePrice ? Math.round(((numComparePrice - numPrice) / numComparePrice) * 100) : 0;

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, slug: product.slug, price: numPrice, comparePrice: numComparePrice ?? undefined, image: product.images[0], quantity: qty, stock: product.stock });
    toast.success("Agregado al carrito", { description: `${qty}x ${product.name}` });
  };

  const specs = product.specs ? (typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs) : {};

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-brand-gray-light mb-6">
        <Link href="/" className="hover:text-brand-green">Inicio</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/productos" className="hover:text-brand-green">Productos</Link>
        <ChevronRight className="w-3 h-3" />
        {product.category && (
          <>
            <Link href={`/categorias/${product.category.slug}`} className="hover:text-brand-green">{product.category.name}</Link>
            <ChevronRight className="w-3 h-3" />
          </>
        )}
        <span className="text-brand-gray font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="bg-gray-50 rounded-2xl aspect-square flex items-center justify-center mb-4 border">
            <span className="text-[120px]">{product.images?.[selectedImage] || "📦"}</span>
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img: string, i: number) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center border-2 transition-colors ${i === selectedImage ? "border-brand-green" : "border-gray-200 hover:border-gray-300"}`}>
                  <span className="text-3xl">{img}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {product.isNew && <Badge className="bg-brand-blue text-white">NUEVO</Badge>}
            {product.isOffer && <Badge className="bg-brand-red text-white">OFERTA -{discount}%</Badge>}
          </div>
          {product.brand && <p className="text-sm text-brand-green font-semibold">{product.brand.name}</p>}
          <h1 className="text-2xl lg:text-3xl font-bold text-brand-gray leading-tight">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex">{[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />)}</div>
            <span className="text-sm text-brand-gray-light">({product.reviews?.length || 0} reseñas)</span>
          </div>

          <p className="text-sm text-brand-gray-light">SKU: {product.sku}</p>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-brand-green">S/. {numPrice.toFixed(2)}</span>
            {numComparePrice && <span className="text-xl text-brand-gray-light line-through">S/. {numComparePrice.toFixed(2)}</span>}
          </div>

          <p className={`text-sm font-semibold ${product.stock > 0 ? "text-brand-green" : "text-brand-red"}`}>
            {product.stock > 0 ? `✓ ${product.stock} unidades disponibles` : "✗ Agotado"}
          </p>

          <Separator />

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-brand-gray">Cantidad:</span>
            <div className="flex items-center border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
              <span className="px-4 font-semibold">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2 hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAdd} disabled={product.stock === 0} className="flex-1 bg-brand-green hover:bg-brand-green-dark text-white h-12 rounded-xl text-base font-bold">
              <ShoppingCart className="w-5 h-5 mr-2" />Agregar al Carrito
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl"><Heart className="w-5 h-5" /></Button>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl"><Share2 className="w-5 h-5" /></Button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
              <Truck className="w-5 h-5 text-brand-green mb-1" />
              <span className="text-[10px] text-brand-gray-light">Envío a todo el Perú</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
              <Shield className="w-5 h-5 text-brand-green mb-1" />
              <span className="text-[10px] text-brand-gray-light">Garantía oficial</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl">
              <RotateCcw className="w-5 h-5 text-brand-green mb-1" />
              <span className="text-[10px] text-brand-gray-light">7 días para cambio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-0">
          <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-green data-[state=active]:text-brand-green px-6 py-3">Descripción</TabsTrigger>
          {Object.keys(specs).length > 0 && (
            <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-green data-[state=active]:text-brand-green px-6 py-3">Especificaciones</TabsTrigger>
          )}
          <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-green data-[state=active]:text-brand-green px-6 py-3">Reseñas ({product.reviews?.length || 0})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-6">
          <p className="text-brand-gray-light leading-relaxed max-w-3xl">{product.description}</p>
        </TabsContent>
        {Object.keys(specs).length > 0 && (
          <TabsContent value="specs" className="py-6">
            <div className="max-w-xl">
              {Object.entries(specs).map(([key, value], i) => (
                <div key={key} className={`flex py-3 ${i % 2 === 0 ? "bg-gray-50" : ""} px-4 rounded`}>
                  <span className="font-semibold text-brand-gray w-40 shrink-0">{key}</span>
                  <span className="text-brand-gray-light">{value as React.ReactNode}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        )}
        <TabsContent value="reviews" className="py-6">
          {product.reviews?.length > 0 ? (
            <div className="space-y-4 max-w-2xl">
              {product.reviews.map((r: any) => (
                <div key={r.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{r.userName || "Usuario Anónimo"}</span>
                    <div className="flex">{Array.from({length: r.rating}).map((_, i) => <Star key={i} className="w-3 h-3 fill-brand-orange text-brand-orange" />)}</div>
                  </div>
                  <p className="text-sm text-brand-gray-light">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-brand-gray-light">Aún no hay reseñas para este producto.</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-brand-gray mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => <ProductCard key={p.id} {...p} image={p.images[0]} brand={p.brand?.name} />)}
          </div>
        </section>
      )}
    </div>
  );
}
