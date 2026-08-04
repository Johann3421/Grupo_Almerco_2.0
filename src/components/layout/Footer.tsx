import Link from "next/link";
import { CreditCard, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerSections = [
  {
    title: "Atención al Cliente",
    links: [
      { name: "Soporte y Contacto", href: "/contacto" },
      { name: "Políticas de Garantía", href: "/garantias" },
      { name: "Preguntas Frecuentes", href: "/contacto" },
      { name: "Seguimiento de Pedido", href: "/cuenta" },
    ],
  },
  {
    title: "Compras y Envíos",
    links: [
      { name: "Catálogo Completo", href: "/productos" },
      { name: "Nuestras Tiendas", href: "/tiendas" },
      { name: "Métodos de Pago", href: "/nosotros" },
      { name: "Zonas de Cobertura", href: "/nosotros" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Nosotros", href: "/nosotros" },
      { name: "Términos y Condiciones", href: "/nosotros" },
      { name: "Protección de Datos", href: "/nosotros" },
      { name: "Libro de Reclamaciones", href: "/libro-reclamaciones" },
    ],
  },
];

const paymentMethods = ["VISA", "MC", "AMEX", "BCP", "YAPE"];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pb-16 lg:pb-0 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white text-base mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-slate-800" />

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span>Medios de Pago:</span>
          <div className="flex gap-1.5">
            {paymentMethods.map((m) => (
              <span key={m} className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-medium">
                {m}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/libro-reclamaciones"
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Libro de Reclamaciones</span>
        </Link>

        <div>
          © {new Date().getFullYear()} TechStore S.A.C.
        </div>
      </div>
    </footer>
  );
}

