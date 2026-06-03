import Link from "next/link";
import {
  CreditCard,
  BookOpen,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" />
    </svg>
  );
}

const footerSections = [
  {
    title: "Servicio al Cliente",
    links: [
      { name: "Clientes", href: "/cuenta" },
      { name: "Contáctenos", href: "/contacto" },
      { name: "Contacta con Soporte Técnico", href: "/contacto" },
      { name: "Garantía dentro de los 7 días", href: "/garantias" },
      { name: "Garantía después de los 15 días", href: "/garantias" },
      { name: "Garantía directa con el CAS", href: "/garantias" },
      { name: "Centros Autorizados de Servicio", href: "/garantias" },
      { name: "Políticas de Garantía", href: "/garantias" },
      { name: "Preguntas Frecuentes", href: "/contacto" },
    ],
  },
  {
    title: "Cómo Comprar",
    links: [
      { name: "Asesores Comerciales", href: "/contacto" },
      { name: "Cómo comprar por Web", href: "/nosotros" },
      { name: "Cómo comprar a un Asesor", href: "/nosotros" },
      { name: "Modalidades de Pago", href: "/nosotros" },
      { name: "Cómo recoger su compra", href: "/tiendas" },
      { name: "Envíos a Lima Metropolitana", href: "/nosotros" },
      { name: "Envíos Express", href: "/nosotros" },
      { name: "Envíos a Nivel Nacional", href: "/nosotros" },
      { name: "Condiciones de Delivery", href: "/nosotros" },
    ],
  },
  {
    title: "Nuestros Productos",
    links: [
      { name: "Productos", href: "/productos" },
      { name: "Marcas", href: "/productos?view=brands" },
      { name: "Novedades", href: "/novedades" },
      { name: "Ofertas", href: "/ofertas" },
      { name: "Laptops", href: "/categorias/laptops" },
      { name: "PCs de Marca", href: "/categorias/pcs-desktop-de-marca" },
      { name: "PCs Ensambladas", href: "/categorias/pcs-ensambladas" },
      { name: "Puntos de Venta POS", href: "/categorias/punto-de-venta-pos" },
      { name: "Monitores", href: "/categorias/monitores-pantallas" },
      { name: "Promociones", href: "/ofertas" },
    ],
  },
  {
    title: "La Empresa",
    links: [
      { name: "Nuestra Empresa", href: "/nosotros" },
      { name: "Tiendas", href: "/tiendas" },
      { name: "Premios", href: "/nosotros" },
      { name: "Trabaja con Nosotros", href: "/contacto" },
      { name: "Mapa del Sitio", href: "/" },
      { name: "Comentarios sobre la web", href: "/contacto" },
      { name: "Sorteos", href: "/nosotros" },
      { name: "Talleres", href: "/nosotros" },
      { name: "Noticias", href: "/nosotros" },
      { name: "Eventos", href: "/nosotros" },
      { name: "Política de protección de datos", href: "/nosotros" },
    ],
  },
];

const paymentMethods = ["VISA", "MC", "AMEX", "Diners", "BCP", "YAPE"];

export function Footer() {
  return (
    <footer className="bg-brand-green text-white pb-20 lg:pb-0">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white text-sm transition-colors hover:underline"
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

      <Separator className="bg-white/20" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-white/70" />
            <span className="text-sm text-white/70 mr-2">Medios de Pago:</span>
            <div className="flex gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="bg-white/20 text-white text-xs px-2 py-1 rounded font-semibold"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Social & Legal */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <YoutubeIcon className="w-5 h-5" />
            </a>
            <Separator orientation="vertical" className="h-5 bg-white/20" />
            <Link
              href="/libro-reclamaciones"
              className="flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Libro de Reclamaciones
            </Link>
          </div>
        </div>

        <div className="text-center mt-6 text-white/60 text-sm">
          © {new Date().getFullYear()} TechStore S.A.C. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
