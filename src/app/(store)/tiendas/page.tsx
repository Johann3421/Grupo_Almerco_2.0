import { MapPin, Clock, Phone } from "lucide-react";

const stores = [
  { name: "TechStore Lima Centro", address: "Av. Wilson 123, Cercado de Lima", phone: "(01) 123-4567", hours: "Lun-Sáb: 9am-7pm | Dom: 10am-4pm", district: "Centro de Lima" },
  { name: "TechStore Miraflores", address: "Av. Larco 456, Miraflores", phone: "(01) 234-5678", hours: "Lun-Sáb: 10am-8pm | Dom: 11am-5pm", district: "Miraflores" },
  { name: "TechStore San Isidro", address: "Calle Las Begonias 789, San Isidro", phone: "(01) 345-6789", hours: "Lun-Vie: 9am-7pm | Sáb: 10am-5pm", district: "San Isidro" },
];

export default function TiendasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-brand-gray">Nuestras Tiendas</h1>
        <p className="text-brand-gray-light mt-2">Visítanos en cualquiera de nuestras ubicaciones</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div key={store.name} className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow">
            <div className="w-full h-40 bg-brand-green-50 rounded-xl mb-4 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-brand-green" />
            </div>
            <h3 className="font-bold text-lg text-brand-gray mb-3">{store.name}</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2 text-brand-gray-light"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-brand-green" />{store.address}</p>
              <p className="flex items-center gap-2 text-brand-gray-light"><Phone className="w-4 h-4 text-brand-green" />{store.phone}</p>
              <p className="flex items-start gap-2 text-brand-gray-light"><Clock className="w-4 h-4 shrink-0 mt-0.5 text-brand-green" />{store.hours}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
