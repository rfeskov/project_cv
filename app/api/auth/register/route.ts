import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/db';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const limit = rateLimit(`register:${getClientIp(req)}`, 10);
  if (!limit.allowed) return NextResponse.json({ error: 'Too many registration attempts. Try again later.' }, { status: 429 });
  const { name, country, email, password, uiLanguage } = await req.json();
  if (!email || !password || !name || !country) return NextResponse.json({ error: 'Name, country, email and password are required.' }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: 'Password must contain at least 8 characters.' }, { status: 400 });
  const normalizedEmail = String(email).toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) return NextResponse.json({ error: 'User with this email already exists.' }, { status: 409 });
  const user = await prisma.user.create({ data: { name, country, email: normalizedEmail, uiLanguage: uiLanguage || 'en', passwordHash: await hash(password, 12) } });
  await prisma.historyItem.create({ data: { userId: user.id, type: 'account', title: 'Account created', details: country || null } });
  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, country: user.country } });
}
