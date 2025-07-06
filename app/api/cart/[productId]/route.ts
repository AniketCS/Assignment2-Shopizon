import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { withAuth } from "@/lib/actions/middleware/withAuth";

export const DELETE = withAuth(async (_req, session, params) => {
  const productId = params.productId;
  // find user’s cart
  const cart = await prisma.cart.findUnique({ where: { userId: session.userId } });
  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  // delete the item
  const deleted = await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });
  if (deleted.count === 0) {
    return NextResponse.json({ error: "Item not in cart" }, { status: 404 });
  }

  // re-fetch filtered items
  const raw = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: { select: { id: true, name: true, price: true } } }
  });
  const items = raw.filter((it) => it.product !== null);
  return NextResponse.json({ items }, { status: 200 });
});
