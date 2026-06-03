"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Credenciales incorrectas", {
        description: "Verifica tu email y contraseña.",
      });
    } else {
      toast.success("¡Bienvenido!");
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🖥️</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-gray">Iniciar Sesión</h1>
          <p className="text-brand-gray-light mt-1">Accede a tu cuenta de TechStore</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                <Input type={showPw ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10"
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-brand-green" />
                <span className="text-brand-gray-light">Recuérdame</span>
              </label>
              <a href="#" className="text-brand-green hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <Button disabled={loading} className="w-full bg-brand-green hover:bg-brand-green-dark text-white h-11 rounded-xl font-bold">
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Ingresando...</> : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-brand-gray-light">O accede como</span>
            <Separator className="flex-1" />
          </div>

          <Button variant="outline" className="w-full h-11 rounded-xl" type="button">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </Button>

          <p className="text-center text-sm text-brand-gray-light mt-6">
            ¿No tienes cuenta? <Link href="/register" className="text-brand-green font-semibold hover:underline">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
