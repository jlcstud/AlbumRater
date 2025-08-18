import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { trackId, score } = await req.json();
  const rating = await prisma.rating.upsert({
    where: { trackId },
    update: { score, updatedAt: new Date() },
    create: { trackId, score },
  });
  return NextResponse.json({ rating });
}
