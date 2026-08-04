import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Wrench } from "lucide-react";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TechStore | En Mantenimiento",
    template: "%s | TechStore",
  },
  description: "Estamos trabajando en mejoras. Volveremos pronto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html lang="es" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#F4F5F7] text-zinc-900 antialiased">
        {isMaintenance ? (
          <div className="flex-1 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-green/20 via-gray-950 to-gray-950 px-4">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full text-center relative z-10 space-y-8 p-8 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-xl shadow-2xl">
              <div className="inline-flex p-4 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green animate-pulse">
                <Wrench className="w-12 h-12" />
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-white via-gray-200 to-brand-green bg-clip-text text-transparent">
                  En Mantenimiento
                </h1>
                <p className="text-base text-gray-400">
                  Estamos optimizando nuestra tienda para ofrecerte la mejor experiencia en tecnología.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  ¿Tienes alguna consulta urgente? Escríbenos a
                </p>
                <a
                  href="mailto:ventas@grupoalmerco.com.pe"
                  className="inline-block mt-2 text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors duration-200 underline underline-offset-4"
                >
                  ventas@grupoalmerco.com.pe
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {children}
            <Toaster />
          </>
        )}
      </body>
    </html>
  );
}

