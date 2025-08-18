'use client';
import { useState } from 'react';
import StarRating from '@/components/StarRating';

type Track = {
  id: string;
  name: string;
  durationMs: number;
  trackNumber: number;
  rating: number | null;
};

type Album = {
  id: string;
  name: string;
  artist: string;
  year: number;
  coverUrl: string;
};

export default function AlbumView({ album, tracks }: { album: Album; tracks: Track[] }) {
  const [data, setData] = useState(tracks);
  const [saving, setSaving] = useState<string | null>(null);

  const update = async (trackId: string, value: number) => {
    setSaving(trackId);
    setData((prev) => prev.map((t) => (t.id === trackId ? { ...t, rating: value } : t)));
    await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackId, score: Math.round(value * 10) }),
    });
    setSaving(null);
  };

  const average = () => {
    const rated = data.filter((t) => t.rating != null);
    if (!rated.length) return null;
    return rated.reduce((s, t) => s + (t.rating || 0), 0) / rated.length;
  };

  const avg = average();

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <img src={album.coverUrl} alt={album.name} className="w-32 h-32 mr-4" />
        <div>
          <h1 className="text-2xl font-bold">{album.name}</h1>
          <p className="text-gray-300">{album.artist} • {album.year}</p>
          <p className="mt-2">Album Avg: {avg != null ? avg.toFixed(1) : '-'}</p>
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">#</th>
            <th className="p-2">Title</th>
            <th className="p-2">Duration</th>
            <th className="p-2">My Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="border-b border-gray-800">
              <td className="p-2">{t.trackNumber}</td>
              <td className="p-2">{t.name}</td>
              <td className="p-2">{Math.floor(t.durationMs / 60000)}:{String(Math.floor((t.durationMs % 60000) / 1000)).padStart(2, '0')}</td>
              <td className="p-2">
                <StarRating value={t.rating || 0} onChange={(v) => update(t.id, v)} disabled={saving === t.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
