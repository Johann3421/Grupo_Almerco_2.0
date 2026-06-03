import { Shield, Clock, Phone, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function GarantiasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Shield className="w-12 h-12 text-brand-green mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-brand-gray">Políticas de Garantía</h1>
        <p className="text-brand-gray-light mt-2">Tu compra está protegida con nosotros</p>
      </div>

      <div className="space-y-8">
        {[
          { icon: Clock, title: "Garantía dentro de los 7 días", content: "Si tu producto presenta defectos de fábrica dentro de los primeros 7 días calendario después de la compra, realizamos el cambio inmediato del producto por uno nuevo, sujeto a disponibilidad de stock." },
          { icon: FileText, title: "Garantía después de los 15 días", content: "Pasados los 15 días, el producto será derivado al Centro Autorizado de Servicio (CAS) del fabricante para su evaluación y reparación bajo garantía." },
          { icon: CheckCircle, title: "Garantía directa con el CAS", content: "Los productos con garantía del fabricante pueden ser llevados directamente al Centro Autorizado de Servicio. TechStore proporciona toda la documentación necesaria." },
          { icon: AlertCircle, title: "Condiciones de Garantía", content: "La garantía no cubre daños por mal uso, caídas, líquidos, modificaciones no autorizadas, o uso inadecuado del producto. El producto debe conservar sus sellos de garantía intactos." },
        ].map((section, i) => (
          <div key={section.title}>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-brand-green-50 rounded-xl flex items-center justify-center shrink-0">
                <section.icon className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-gray mb-2">{section.title}</h2>
                <p className="text-brand-gray-light leading-relaxed">{section.content}</p>
              </div>
            </div>
            {i < 3 && <Separator className="mt-8" />}
          </div>
        ))}
      </div>
    </div>
  );
}
