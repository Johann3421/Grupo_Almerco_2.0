"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al crear la cuenta");
        return;
      }

      // Auto-login after register
      await signIn("credentials", { email, password, redirect: false });
      toast.success("¡Cuenta creada con éxito!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🖥️</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-gray">Crear Cuenta</h1>
          <p className="text-brand-gray-light mt-1">Únete a TechStore hoy</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label>Nombre Completo</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="text" placeholder="Juan Pérez" className="pl-10"
                  value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>
            <div>
              <Label>Correo Electrónico</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="email" placeholder="correo@ejemplo.com" className="pl-10"
                  value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <Label>Contraseña</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type={showPw ? "text" : "password"} placeholder="Mínimo 6 caracteres" className="pl-10 pr-10"
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="accent-brand-green mt-0.5" required />
              <span className="text-brand-gray-light">
                Acepto los <a href="#" className="text-brand-green hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-brand-green hover:underline">Política de Privacidad</a>
              </span>
            </label>
            <Button disabled={loading} className="w-full bg-brand-green hover:bg-brand-green-dark text-white h-11 rounded-xl font-bold">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creando cuenta...</> : "Crear Cuenta"}
            </Button>
          </form>

          <p className="text-center text-sm text-brand-gray-light mt-6">
            ¿Ya tienes cuenta? <Link href="/login" className="text-brand-green font-semibold hover:underline">Inicia Sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
