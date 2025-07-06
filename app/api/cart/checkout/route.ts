import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { withAuth } from "@/lib/actions/middleware/withAuth";
import { z } from "zod";

const CheckoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().min(1)
  }))
});

export const POST = withAuth(async (req: NextRequest, session) => {
  const json = await req.json();
  const parsed = CheckoutSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout data" }, { status: 400 });
  }
  const { items } = parsed.data;

  // fetch cart and include its items + each product's businessId
  const cart = await prisma.cart.findUnique({
    where: { userId: session.userId },
    include: {
      items: {
        include: { product: { select: { businessId: true } } }
      }
    }
  });
  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  // compute total
  let total = 0;
  for (const { productId, quantity } of items) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json(
        { error: `Product ${productId} not found` },
        { status: 404 }
      );
    }
    total += product.price * quantity;
  }

  // create the order, derive businessId from first cart item
  const order = await prisma.order.create({
    data: {
      userId: session.userId,
      businessId: cart.items.length > 0
        ? cart.items[0].product.businessId
        : "",
      total,
      status: "PENDING"
    }
  });

  // create each orderItem
  for (const { productId, quantity } of items) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId,
        quantity,
        price: product!.price
      }
    });
  }

  return NextResponse.json({
    orderId: order.id,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt
  }, { status: 201 });
});
