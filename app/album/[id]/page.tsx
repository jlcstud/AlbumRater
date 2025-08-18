import AlbumView from './AlbumView';

async function getData(id: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}/api/spotify/album/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return <AlbumView album={data.album} tracks={data.tracks} />;
}
