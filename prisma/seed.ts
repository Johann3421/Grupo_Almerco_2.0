import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando el seeding de la base de datos...");

  // 1. Limpiar datos existentes (Opcional, útil para dev)
  // Cuidado: el orden importa por las claves foráneas
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

  console.log("Datos anteriores eliminados.");

  // 2. Crear Categorías
  const categorias = [
    { name: "Laptops", slug: "laptops", description: "Laptops para gaming, oficina y estudio.", image: "💻" },
    { name: "Procesadores", slug: "procesadores", description: "Procesadores Intel y AMD.", image: "⚡" },
    { name: "Tarjetas Gráficas NVIDIA", slug: "tarjetas-graficas-nvidia", description: "Tarjetas de video NVIDIA GeForce.", image: "🖥️" },
    { name: "Tarjetas Gráficas AMD", slug: "tarjetas-graficas-amd", description: "Tarjetas de video AMD Radeon.", image: "🖥️" },
    { name: "Memorias RAM", slug: "memorias-ram", description: "Memorias RAM DDR4 y DDR5.", image: "🔧" },
    { name: "Placas Madre", slug: "placas-madre", description: "Motherboards Intel y AMD.", image: "🔩" },
    { name: "Almacenamiento SSD", slug: "almacenamiento-ssd", description: "Discos sólidos SATA, NVMe M.2.", image: "💾" },
    { name: "Monitores", slug: "monitores-pantallas", description: "Monitores para gaming y diseño.", image: "📺" },
    { name: "Teclados", slug: "teclados", description: "Teclados mecánicos y de membrana.", image: "⌨️" },
    { name: "Mouse", slug: "mouse", description: "Mouse gaming y de productividad.", image: "🖱️" },
    { name: "Auriculares", slug: "auriculares-microfonos", description: "Headsets y audífonos.", image: "🎧" },
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
  ];

  const dbMarcas = await Promise.all(
    marcas.map((marca) => prisma.brand.create({ data: marca }))
  );

  console.log(`Se crearon ${dbMarcas.length} marcas.`);

  // Helper para obtener IDs
  const getCatId = (slug: string) => dbCategorias.find((c) => c.slug === slug)?.id!;
  const getBrandId = (slug: string) => dbMarcas.find((b) => b.slug === slug)?.id!;

  // 4. Crear Productos
  const productos = [
    {
      name: "ASUS ROG Strix G16 - RTX 4070 i9-13980HX",
      slug: "asus-rog-strix-g16",
      sku: "ASU-ROG-G16-4070",
      description: "Laptop gaming de alto rendimiento con Intel i9 de 13va gen y RTX 4070.",
      price: 6499.00,
      comparePrice: 7999.00,
      stock: 15,
      categoryId: getCatId("laptops"),
      brandId: getBrandId("asus"),
      images: ["💻", "🖥️"],
      specs: {
        "Procesador": "Intel Core i9-13980HX",
        "GPU": "NVIDIA GeForce RTX 4070 8GB",
        "RAM": "16GB DDR5",
        "Pantalla": "16\" QHD+ 240Hz",
      },
      isNew: true,
      isOffer: true,
    },
    {
      name: "Intel Core i9-14900K",
      slug: "intel-core-i9-14900k",
      sku: "INT-I9-14900K",
      description: "Procesador Intel de 14va Generación con 24 núcleos y hasta 6.0GHz.",
      price: 2199.00,
      stock: 12,
      categoryId: getCatId("procesadores"),
      brandId: getBrandId("intel"),
      images: ["⚡"],
      specs: {
        "Núcleos": "24 (8P+16E)",
        "Hilos": "32",
        "Frecuencia Base": "3.2 GHz",
        "Socket": "LGA 1700",
      },
      isNew: true,
      isOffer: false,
    },
    {
      name: "MSI GeForce RTX 4070 SUPER VENTUS 3X",
      slug: "msi-rtx-4070-super-ventus",
      sku: "MSI-4070S-VEN3X",
      description: "Tarjeta de video NVIDIA RTX 4070 SUPER con refrigeración triple fan.",
      price: 2899.00,
      comparePrice: 3299.00,
      stock: 8,
      categoryId: getCatId("tarjetas-graficas-nvidia"),
      brandId: getBrandId("msi"),
      images: ["🖥️"],
      specs: {
        "VRAM": "12GB GDDR6X",
        "CUDA Cores": "7168",
        "Interfaz": "PCIe 4.0 x16",
      },
      isNew: false,
      isOffer: true,
    },
    {
      name: "Logitech G PRO X SUPERLIGHT 2",
      slug: "logitech-g-pro-x-superlight-2",
      sku: "LOG-PRO-SL2",
      description: "Mouse gaming inalámbrico ultraligero para eSports.",
      price: 459.00,
      stock: 30,
      categoryId: getCatId("mouse"),
      brandId: getBrandId("logitech"),
      images: ["🖱️"],
      specs: {
        "Peso": "60g",
        "Sensor": "HERO 2",
        "DPI": "32000",
        "Conectividad": "LIGHTSPEED Wireless",
      },
      isNew: true,
      isOffer: false,
    },
    {
      name: "Samsung 990 PRO 2TB NVMe M.2",
      slug: "samsung-990-pro-2tb",
      sku: "SAM-990PRO-2TB",
      description: "SSD NVMe de altísimo rendimiento ideal para gaming y creadores.",
      price: 849.00,
      comparePrice: 999.00,
      stock: 25,
      categoryId: getCatId("almacenamiento-ssd"),
      brandId: getBrandId("samsung"),
      images: ["💾"],
      specs: {
        "Capacidad": "2TB",
        "Lectura Secuencial": "Hasta 7450 MB/s",
        "Escritura Secuencial": "Hasta 6900 MB/s",
        "Interfaz": "PCIe 4.0 x4",
      },
      isNew: false,
      isOffer: true,
    }
  ];

  await Promise.all(
    productos.map((prod) => prisma.product.create({ data: prod }))
  );

  console.log(`Se crearon ${productos.length} productos.`);
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
