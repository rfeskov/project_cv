import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  const limit = rateLimit(`history-read:${getClientIp(req)}`, 60);
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId is required.' }, { status: 400 });
  const items = await prisma.historyItem.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 100 });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const limit = rateLimit(`history-write:${getClientIp(req)}`, 40);
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  const { userId, type, title, details, payload } = await req.json();
  if (!userId || !type || !title) return NextResponse.json({ error: 'userId, type and title are required.' }, { status: 400 });
  const item = await prisma.historyItem.create({ data: { userId, type, title, details, payload: payload || {} } });
  return NextResponse.json({ item });
}
