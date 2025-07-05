// // File: lib/withAuth.ts
// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// export function withAuth(handler: (req: NextRequest & { userId: string }) => Promise<NextResponse>) {
//   return async (req: NextRequest) => {
//     const token = req.cookies.get('accessToken')?.value;
//     if (!token) {
//       return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
//     }
//     try {
//       const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
//       return handler(Object.assign(req, { userId }));
//     } catch {
//       return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
//     }
//   };
// }