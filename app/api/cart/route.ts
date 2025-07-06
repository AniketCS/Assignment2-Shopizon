import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { withAuth } from "@/lib/actions/middleware/withAuth";

const AddSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1)
});

export const GET = withAuth(async (_req, session) => {
  // fetch raw items + include product
  const raw = await prisma.cartItem.findMany({
    where: { cart: { userId: session.userId } },
    include: { product: { select: { id: true, name: true, price: true } } },
  });
  // filter out any null-product rows
  const items = raw.filter((it) => it.product !== null);
  return NextResponse.json({ items }, { status: 200 });
});

export const POST = withAuth(async (req, session) => {
  const body = await req.json();
  const result = AddSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }
  const { productId, quantity } = result.data;

  // ensure cart exists
  const cart = await prisma.cart.upsert({
    where: { userId: session.userId },
    create: { userId: session.userId },
    update: {}
  });

  // upsert the cart-item
  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    create: { cartId: cart.id, productId, quantity, price: 0 },
    update: { quantity },
  });

  // re-fetch & filter
  const raw = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: { select: { id: true, name: true, price: true } } },
  });
  const items = raw.filter((it) => it.product !== null);
  return NextResponse.json({ items }, { status: 200 });
});
