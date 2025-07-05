// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db/prisma';
// import { randomBytes } from 'crypto';
// import nodemailer from 'nodemailer';

// export async function POST(req: NextRequest) {
//   const { email } = await req.json();
//   if (!email) {
//     return NextResponse.json({ error: 'Email required' }, { status: 400 });
//   }

//   // Lookup user
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (user) {
//     // 1) creating a one-time token
//     const token = randomBytes(32).toString('hex');
//     const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h

//     await prisma.passwordResetToken.create({
//       data: { userId: user.id, token, expiresAt: expires }
//     });

//     // 2) sending email
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });
//     const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`;
//     await transporter.sendMail({
//       to: email,
//       subject: 'Shopizon Password Reset',
//       html: `Click <a href="${url}">here</a> to reset your password. Link expires in one hour.`,
//     });
//   }

//   // generic success
//   return NextResponse.json({ ok: true });
// }
