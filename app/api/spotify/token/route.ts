import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/spotify';

export async function GET() {
  const token = await getAccessToken();
  return NextResponse.json({ token });
}
