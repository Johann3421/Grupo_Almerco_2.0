import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const search = searchParams.get("search");
    const isNew = searchParams.get("isNew") === "true";
    const isOffer = searchParams.get("isOffer") === "true";
    
    // Construct the Prisma query
    const where: any = {};
    
    if (category) {
      where.category = { slug: category };
    }
    
    if (brand) {
      where.brand = { slug: brand };
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { brand: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (isNew) where.isNew = true;
    if (isOffer) where.isOffer = true;

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
