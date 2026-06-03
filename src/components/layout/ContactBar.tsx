import { MessageCircle, Mail, Phone } from "lucide-react";

export function ContactBar() {
  return (
    <div className="bg-white border-b border-gray-100 hidden md:block">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-sm">
          <a
            href="https://wa.me/51999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-green hover:text-brand-green-dark transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-semibold">WhatsApp:</span>
            <span>Contacta con tu Asesor de Ventas Online</span>
          </a>

          <div className="flex items-center gap-6">
            <a
              href="mailto:ventas@techstore.pe"
              className="flex items-center gap-2 text-brand-gray-light hover:text-brand-green transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Atención al Cliente</span>
            </a>

            <a
              href="tel:+5111234567"
              className="flex items-center gap-2 text-brand-gray-light hover:text-brand-green transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Soporte: (01) 123-4567</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
