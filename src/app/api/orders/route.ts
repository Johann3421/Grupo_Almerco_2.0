import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total, shippingAddress, paymentMethod, userId } = body;

    // For a real app, you would validate the stock and prices here again
    
    // Fallback user if not provided (for development/testing)
    let finalUserId = userId;
    if (finalUserId === "user_placeholder_123") {
      const user = await prisma.user.findFirst({ where: { email: "test@example.com" } });
      if (user) {
        finalUserId = user.id;
      } else {
        const newUser = await prisma.user.create({
          data: { email: "test@example.com", name: "Test User" }
        });
        finalUserId = newUser.id;
      }
    }

    const order = await prisma.order.create({
      data: {
        total,
        subtotal: total,
        discount: 0,
        shippingCost: 0,
        shippingAddress: shippingAddress || {},
        paymentMethod: paymentMethod || "Tarjeta",
        status: "PENDING",
        userId: finalUserId,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
