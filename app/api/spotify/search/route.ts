import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/spotify';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  if (!q) return NextResponse.json({ albums: [] });
  const token = await getAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/search?type=album&q=${encodeURIComponent(q)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  const albums = (json.albums?.items || []).map((a: any) => ({
    id: a.id,
    name: a.name,
    artist: a.artists.map((ar: any) => ar.name).join(', '),
    year: a.release_date?.slice(0, 4),
    image: a.images?.[0]?.url,
  }));
  return NextResponse.json({ albums });
}
