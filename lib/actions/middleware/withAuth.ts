import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function withAuth<
  P extends { params: Record<string,string> }
>(
  handler: (
    req: NextRequest,
    session: { userId: string; role: string },
    params: P["params"]
  ) => Promise<NextResponse>
) {
  if (process.env.NODE_ENV === "development") {
    // always act as Emily Chen
    const devSession = { userId: "686968c9e6ef528cc7e7aff3", role: "CUSTOMER" };
    return async (req: NextRequest, ctx: P) => {
      return handler(req, devSession, ctx.params);
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
      return handler(req, session, ctx.params);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  };
}
