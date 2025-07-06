import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function withAuth<
  P extends { params: Promise<Record<string, string>> }
>(
  handler: (
    req: NextRequest,
    session: { userId: string; role: string },
    params: Record<string, string>
  ) => Promise<NextResponse>
) {
  if (process.env.NODE_ENV === "development") {
    const devSession = { userId: "686968c9e6ef528cc7e7aff3", role: "CUSTOMER" };
    return async (req: NextRequest, ctx: P) => {
      const params = await ctx.params;
      return handler(req, devSession, params);
    };
  }

  return async (req: NextRequest, ctx: P) => {
    const auth = req.headers.get("authorization") || "";
    const m = /^Bearer (.+)$/.exec(auth);
    if (!m) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const session = jwt.verify(m[1], JWT_SECRET) as {
        userId: string;
        role: string;
      };
      const params = await ctx.params;
      return handler(req, session, params);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}
