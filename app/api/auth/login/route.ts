import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_env_secret';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Validating request body
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  // Finding user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  // Creating JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  // Sending token and user info
  return NextResponse.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
}
