import { Building2, Award, Users, MapPin, Truck, Shield, Star } from "lucide-react";

export default function NosotrosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-brand-green to-emerald-600 rounded-2xl p-12 text-white text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Nuestra Empresa</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">Más de 10 años llevando tecnología de calidad a todo el Perú</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-brand-gray mb-4">¿Quiénes Somos?</h2>
          <p className="text-brand-gray-light leading-relaxed mb-4">TechStore es una empresa peruana líder en la venta de equipos de cómputo, laptops, componentes, periféricos y accesorios tecnológicos. Desde nuestra fundación, nos hemos comprometido con ofrecer productos de las mejores marcas a precios competitivos.</p>
          <p className="text-brand-gray-light leading-relaxed">Contamos con tiendas físicas en Lima y un sistema de envíos que cubre todo el territorio nacional, garantizando que la tecnología llegue a cada rincón del país.</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-brand-gray mb-4">Nuestra Misión</h2>
          <p className="text-brand-gray-light leading-relaxed mb-4">Democratizar el acceso a la tecnología en el Perú, ofreciendo productos genuinos con garantía oficial, asesoría especializada y un servicio post-venta que respalde cada compra.</p>
          <h2 className="text-2xl font-bold text-brand-gray mb-4 mt-8">Nuestra Visión</h2>
          <p className="text-brand-gray-light leading-relaxed">Ser la tienda de tecnología más confiable y accesible del Perú, reconocida por la calidad de nuestro servicio y la satisfacción de nuestros clientes.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[
          { icon: Users, label: "Clientes Satisfechos", value: "50,000+" },
          { icon: Star, label: "Productos Disponibles", value: "10,000+" },
          { icon: Truck, label: "Envíos Realizados", value: "100,000+" },
          { icon: Award, label: "Años de Experiencia", value: "10+" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-6 bg-brand-green-50 rounded-2xl">
            <stat.icon className="w-8 h-8 text-brand-green mx-auto mb-3" />
            <p className="text-2xl font-bold text-brand-gray">{stat.value}</p>
            <p className="text-sm text-brand-gray-light">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <h2 className="text-2xl font-bold text-brand-gray text-center mb-8">Nuestros Valores</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: "Confianza", desc: "Todos nuestros productos cuentan con garantía oficial y soporte post-venta." },
          { icon: Award, title: "Calidad", desc: "Trabajamos exclusivamente con marcas reconocidas y distribuidores autorizados." },
          { icon: Users, title: "Servicio", desc: "Equipo de asesores especializados disponibles para ayudarte en tu compra." },
        ].map((v) => (
          <div key={v.title} className="bg-white border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <v.icon className="w-10 h-10 text-brand-green mx-auto mb-4" />
            <h3 className="font-bold text-lg text-brand-gray mb-2">{v.title}</h3>
            <p className="text-brand-gray-light text-sm">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
