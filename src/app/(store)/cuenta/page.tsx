"use client";

import Link from "next/link";
import { User, Package, MapPin, Heart, Lock, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function CuentaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-gray mb-6">Mi Cuenta</h1>
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="w-full justify-start bg-white border rounded-xl p-1 h-auto flex-wrap gap-1">
          <TabsTrigger value="orders" className="rounded-lg data-[state=active]:bg-brand-green data-[state=active]:text-white gap-2"><Package className="w-4 h-4" />Pedidos</TabsTrigger>
          <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-brand-green data-[state=active]:text-white gap-2"><User className="w-4 h-4" />Datos</TabsTrigger>
          <TabsTrigger value="addresses" className="rounded-lg data-[state=active]:bg-brand-green data-[state=active]:text-white gap-2"><MapPin className="w-4 h-4" />Direcciones</TabsTrigger>
          <TabsTrigger value="wishlist" className="rounded-lg data-[state=active]:bg-brand-green data-[state=active]:text-white gap-2"><Heart className="w-4 h-4" />Deseos</TabsTrigger>
          <TabsTrigger value="password" className="rounded-lg data-[state=active]:bg-brand-green data-[state=active]:text-white gap-2"><Lock className="w-4 h-4" />Contraseña</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-lg mb-4">Mis Pedidos</h2>
            <div className="space-y-4">
              {[
                { id: "TS-001234", date: "10 May 2024", total: 6499, status: "Entregado", color: "bg-brand-green" },
                { id: "TS-001233", date: "5 May 2024", total: 2899, status: "En camino", color: "bg-brand-blue" },
                { id: "TS-001232", date: "28 Abr 2024", total: 549, status: "Procesando", color: "bg-brand-orange" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-brand-gray">{order.id}</p>
                    <p className="text-sm text-brand-gray-light">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-green">S/. {order.total.toFixed(2)}</p>
                    <Badge className={`${order.color} text-white text-xs`}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-lg mb-4">Mis Datos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <div><Label>Nombre</Label><Input defaultValue="Juan" className="mt-1" /></div>
              <div><Label>Apellido</Label><Input defaultValue="Pérez" className="mt-1" /></div>
              <div><Label>Email</Label><Input defaultValue="juan@ejemplo.com" className="mt-1" /></div>
              <div><Label>Teléfono</Label><Input defaultValue="+51 999 999 999" className="mt-1" /></div>
              <div className="sm:col-span-2"><Button className="bg-brand-green hover:bg-brand-green-dark text-white">Guardar Cambios</Button></div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="addresses">
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Mis Direcciones</h2>
              <Button size="sm" className="bg-brand-green text-white">+ Nueva Dirección</Button>
            </div>
            <div className="border rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">Casa <Badge className="bg-brand-green text-white text-xs ml-2">Principal</Badge></p>
                  <p className="text-sm text-brand-gray-light mt-1">Av. Principal 123, Miraflores, Lima</p>
                  <p className="text-sm text-brand-gray-light">+51 999 999 999</p>
                </div>
                <Button variant="outline" size="sm">Editar</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="bg-white rounded-xl border p-6 text-center py-12">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h2 className="font-bold text-lg mb-2">Lista de Deseos vacía</h2>
            <p className="text-brand-gray-light mb-4">Guarda productos que te interesen</p>
            <Link href="/productos"><Button className="bg-brand-green text-white">Ver Productos</Button></Link>
          </div>
        </TabsContent>

        <TabsContent value="password">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-lg mb-4">Cambiar Contraseña</h2>
            <div className="space-y-4 max-w-sm">
              <div><Label>Contraseña Actual</Label><Input type="password" className="mt-1" /></div>
              <div><Label>Nueva Contraseña</Label><Input type="password" className="mt-1" /></div>
              <div><Label>Confirmar Contraseña</Label><Input type="password" className="mt-1" /></div>
              <Button className="bg-brand-green hover:bg-brand-green-dark text-white">Actualizar Contraseña</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
