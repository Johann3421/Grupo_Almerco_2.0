const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando el seeding de la base de datos...");

  // 1. Limpiar datos existentes
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

  console.log("Datos anteriores eliminados.");

  // 2. Crear Categorías
  const categorias = [
    { name: "Laptops", slug: "laptops", description: "Laptops para gaming, oficina y estudio.", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=80" },
    { name: "Procesadores", slug: "procesadores", description: "Procesadores Intel y AMD.", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=80" },
    { name: "Tarjetas Gráficas NVIDIA", slug: "tarjetas-graficas-nvidia", description: "Tarjetas de video NVIDIA GeForce.", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=80" },
    { name: "Tarjetas Gráficas AMD", slug: "tarjetas-graficas-amd", description: "Tarjetas de video AMD Radeon.", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=80" },
    { name: "Memorias RAM", slug: "memorias-ram", description: "Memorias RAM DDR4 y DDR5.", image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&auto=format&fit=crop&q=80" },
    { name: "Placas Madre", slug: "placas-madre", description: "Motherboards Intel y AMD.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80" },
    { name: "Almacenamiento SSD", slug: "almacenamiento-ssd", description: "Discos sólidos SATA, NVMe M.2.", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&auto=format&fit=crop&q=80" },
    { name: "Monitores", slug: "monitores-pantallas", description: "Monitores para gaming y diseño.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=80" },
    { name: "Teclados", slug: "teclados", description: "Teclados mecánicos y de membrana.", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80" },
    { name: "Mouse", slug: "mouse", description: "Mouse gaming y de productividad.", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80" },
    { name: "Auriculares", slug: "auriculares-microfonos", description: "Headsets y audífonos.", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80" },
  ];

  const dbCategorias = await Promise.all(
    categorias.map((cat) => prisma.category.create({ data: cat }))
  );

  console.log(`Se crearon ${dbCategorias.length} categorías.`);

  // 3. Crear Marcas
  const marcas = [
    { name: "ASUS", slug: "asus", logo: "ASUS" },
    { name: "MSI", slug: "msi", logo: "MSI" },
    { name: "Gigabyte", slug: "gigabyte", logo: "GIGABYTE" },
    { name: "Intel", slug: "intel", logo: "INTEL" },
    { name: "AMD", slug: "amd", logo: "AMD" },
    { name: "Corsair", slug: "corsair", logo: "CORSAIR" },
    { name: "Kingston", slug: "kingston", logo: "KINGSTON" },
    { name: "Samsung", slug: "samsung", logo: "SAMSUNG" },
    { name: "Logitech", slug: "logitech", logo: "LOGITECH" },
    { name: "Razer", slug: "razer", logo: "RAZER" },
    { name: "Lenovo", slug: "lenovo", logo: "LENOVO" },
    { name: "LG", slug: "lg", logo: "LG" },
  ];

  const dbMarcas = await Promise.all(
    marcas.map((marca) => prisma.brand.create({ data: marca }))
  );

  console.log(`Se crearon ${dbMarcas.length} marcas.`);

  // Helper para obtener IDs
  const getCatId = (slug) => dbCategorias.find((c) => c.slug === slug)?.id || dbCategorias[0].id;
  const getBrandId = (slug) => dbMarcas.find((b) => b.slug === slug)?.id || dbMarcas[0].id;

  // 4. Crear Productos
  const productos = [
    {
      name: "ASUS ROG Strix G16 i9-13980HX RTX 4070 16GB SSD 1TB 240Hz",
      slug: "asus-rog-strix-g16",
      sku: "ASU-ROG-G16-4070",
      description: "Laptop gaming de alto rendimiento con procesador Intel Core i9-13980HX de 13va generación y gráfica NVIDIA GeForce RTX 4070 de 8GB. Cuenta con pantalla ROG Nebula de 16 pulgadas QHD+ a 240Hz para una experiencia fluida e inmersiva.",
      price: 6499.00,
      comparePrice: 7299.00,
      stock: 15,
      categoryId: getCatId("laptops"),
      brandId: getBrandId("asus"),
      images: [
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
      ],
      specs: {
        "Procesador": "Intel Core i9-13980HX (24 Núcleos, hasta 5.6 GHz)",
        "Tarjeta de Video": "NVIDIA GeForce RTX 4070 8GB GDDR6",
        "Memoria RAM": "16GB DDR5 4800MHz",
        "Almacenamiento": "1TB SSD NVMe PCIe 4.0",
        "Pantalla": "16\" QHD+ (2560x1600) 240Hz 3ms IPS"
      },
      isNew: true,
      isOffer: true,
    },
    {
      name: "Procesador Intel Core i9-14900K 24-Cores 6.0GHz LGA1700",
      slug: "intel-core-i9-14900k",
      sku: "INT-I9-14900K",
      description: "El procesador para entusiastas más rápido del mercado. Con 24 núcleos (8P + 16E) y 32 hilos, alcanza velocidades de hasta 6.0GHz con Intel Thermal Velocity Boost.",
      price: 2199.00,
      comparePrice: 2499.00,
      stock: 12,
      categoryId: getCatId("procesadores"),
      brandId: getBrandId("intel"),
      images: [
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80"
      ],
      specs: {
        "Núcleos / Hilos": "24 (8 Performance + 16 Efficient) / 32 Hilos",
        "Frecuencia Turbo Max": "Hasta 6.0 GHz",
        "Caché L3": "36 MB Intel Smart Cache",
        "Socket": "LGA 1700"
      },
      isNew: true,
      isOffer: false,
    },
    {
      name: "Tarjeta de Video MSI GeForce RTX 4070 SUPER Ventus 3X 12GB",
      slug: "msi-rtx-4070-super-ventus",
      sku: "MSI-4070S-VEN3X",
      description: "Diseño elegante enfocado al rendimiento constante. Sistema de refrigeración de triple ventilador TORX Fan 4.0 y placa posterior de refuerzo para sesiones intensas de juego.",
      price: 2899.00,
      comparePrice: 3299.00,
      stock: 8,
      categoryId: getCatId("tarjetas-graficas-nvidia"),
      brandId: getBrandId("msi"),
      images: [
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80"
      ],
      specs: {
        "Memoria VRAM": "12GB GDDR6X",
        "Núcleos CUDA": "7168 Cores",
        "Interfaz": "PCI Express Gen 4",
        "Salidas de Video": "DisplayPort x 3 (v1.4a) / HDMI x 1"
      },
      isNew: false,
      isOffer: true,
    },
    {
      name: "Lenovo Legion Pro 5 Ryzen 7 7745HX RTX 4060 16GB 1TB SSD",
      slug: "lenovo-legion-pro-5",
      sku: "LEN-LEG-PRO5-4060",
      description: "Potencia ajustada con IA gracias a la tecnología Legion Coldfront 5.0. Equipada con el procesador AMD Ryzen 7 de la serie 7000 y tarjeta NVIDIA RTX 4060.",
      price: 5199.00,
      comparePrice: 5799.00,
      stock: 5,
      categoryId: getCatId("laptops"),
      brandId: getBrandId("lenovo"),
      images: [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
      ],
      specs: {
        "Procesador": "AMD Ryzen 7 7745HX (8C / 16T, hasta 5.1GHz)",
        "Gráficos": "NVIDIA GeForce RTX 4060 8GB GDDR6",
        "RAM": "16GB (2x 8GB) SO-DIMM DDR5-5200",
        "Pantalla": "16\" WQXGA (2560x1600) IPS 165Hz"
      },
      isNew: true,
      isOffer: true,
    },
    {
      name: "Monitor Gamer LG UltraGear 27\" 180Hz 1ms IPS QHD 2K HDR",
      slug: "monitor-lg-ultragear-27",
      sku: "LG-UG-27QHD",
      description: "Experimenta la velocidad del panel Nano IPS de 1ms con resolución Quad HD. Compatible con NVIDIA G-SYNC y AMD FreeSync Premium para jugar sin distorsión.",
      price: 1149.00,
      comparePrice: 1399.00,
      stock: 20,
      categoryId: getCatId("monitores-pantallas"),
      brandId: getBrandId("lg"),
      images: [
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80"
      ],
      specs: {
        "Tamaño de Pantalla": "27 Pulgadas QHD (2560 x 1440)",
        "Tasa de Refresco": "180Hz",
        "Tiempo de Respuesta": "1ms (GtG)",
        "Tecnología Panel": "IPS con HDR10"
      },
      isNew: false,
      isOffer: true,
    },
    {
      name: "SSD Samsung 990 PRO 2TB NVMe M.2 PCIe 4.0 7450MB/s",
      slug: "samsung-990-pro-2tb",
      sku: "SAM-990PRO-2TB",
      description: "Maximiza el rendimiento de tu PC o consola PlayStation 5 con velocidades de lectura de hasta 7450 MB/s. Eficiencia energética mejorada en más del 50%.",
      price: 849.00,
      comparePrice: 999.00,
      stock: 25,
      categoryId: getCatId("almacenamiento-ssd"),
      brandId: getBrandId("samsung"),
      images: [
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80"
      ],
      specs: {
        "Capacidad": "2TB M.2 2280",
        "Velocidad Lectura": "Hasta 7,450 MB/s",
        "Velocidad Escritura": "Hasta 6,900 MB/s",
        "Interfaz": "PCIe Gen 4.0 x4, NVMe 2.0"
      },
      isNew: false,
      isOffer: true,
    },
    {
      name: "Mouse Gamer Logitech G PRO X Superlight 2 Wireless 60g 32K DPI",
      slug: "logitech-g-pro-x-superlight-2",
      sku: "LOG-PRO-SL2",
      description: "El mouse de eSports más premiado del mundo, ahora rediseñado con interruptores híbridos LIGHTFORCE y sensor HERO 2 ultra preciso de 32,000 DPI.",
      price: 459.00,
      comparePrice: 529.00,
      stock: 30,
      categoryId: getCatId("mouse"),
      brandId: getBrandId("logitech"),
      images: [
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80"
      ],
      specs: {
        "Peso": "60 gramos",
        "Sensor": "HERO 2",
        "Resolución": "100 - 32,000 DPI",
        "Autonomía Batería": "Hasta 95 horas seguidas"
      },
      isNew: true,
      isOffer: false,
    },
    {
      name: "Teclado Mecánico Corsair K70 RGB PRO Cherry MX Red",
      slug: "teclado-corsair-k70-pro",
      sku: "COR-K70-PRO-RED",
      description: "Estructura de aluminio legendaria, switches mecánicos Cherry MX 100% alemanes y tecnología de procesamiento CORSAIR AXON de 8,000Hz.",
      price: 549.00,
      comparePrice: 649.00,
      stock: 10,
      categoryId: getCatId("teclados"),
      brandId: getBrandId("corsair"),
      images: [
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"
      ],
      specs: {
        "Switches": "CHERRY MX Red Lineales",
        "Formato": "Tamaño Completo (Full-Size)",
        "Iluminación": "RGB Tecla por Tecla",
        "Tasa de Sondeo": "Hasta 8,000Hz con AXON"
      },
      isNew: false,
      isOffer: true,
    },
    {
      name: "Demo Producto - Equipo Gamer TechStore",
      slug: "demo-producto",
      sku: "DEMO-TECH-001",
      description: "Producto de demostración técnica para la tienda TechStore con todas las especificaciones y soporte postventa.",
      price: 999.00,
      comparePrice: 1199.00,
      stock: 10,
      categoryId: getCatId("laptops"),
      brandId: getBrandId("asus"),
      images: [
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
      ],
      specs: { "Garantía": "12 Meses Oficial", "Estado": "Nuevo Sellado" },
      isNew: true,
      isOffer: false,
    },
  ];

  for (const prod of productos) {
    const createdProduct = await prisma.product.create({ data: prod });
    
    // Crear reseña de ejemplo
    await prisma.review.create({
      data: {
        productId: createdProduct.id,
        userId: (await prisma.user.findFirst())?.id || "",
        rating: 5,
        comment: "Excelente producto, 100% recomendado por TechStore. Entrega rápida en Lima."
      }
    }).catch(() => {});
  }

  console.log(`Se crearon ${productos.length} productos con imágenes reales.`);
  console.log("Seeding completado con éxito! ✅");
}

main()
  .catch((e) => {
    console.error("Error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
