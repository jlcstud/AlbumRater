import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/spotify';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/albums/${params.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();

  const album = {
    id: json.id,
    name: json.name,
    artist: json.artists.map((a: any) => a.name).join(', '),
    year: parseInt(json.release_date?.slice(0, 4)),
    coverUrl: json.images?.[0]?.url,
  };

  await prisma.album.upsert({
    where: { id: album.id },
    update: album,
    create: album,
  });

  const tracks = await Promise.all(
    json.tracks.items.map(async (t: any) => {
      const trackData = {
        id: t.id,
        albumId: album.id,
        name: t.name,
        durationMs: t.duration_ms,
        trackNumber: t.track_number,
      };
      await prisma.track.upsert({
        where: { id: t.id },
        update: trackData,
        create: trackData,
      });
      const rating = await prisma.rating.findUnique({ where: { trackId: t.id } });
      return { ...trackData, rating: rating ? rating.score / 10 : null };
    })
  );

  return NextResponse.json({ album, tracks });
}
