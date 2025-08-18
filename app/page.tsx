'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const match = query.match(/(album)\/([a-zA-Z0-9]+)/);
    if (match) {
      router.push(`/album/${match[2]}`);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.albums);
    setLoading(false);
  };

  return (
    <main className="p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          className="flex-1 p-2 rounded text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search albums or paste URL"
        />
      </form>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-2 gap-4">
        {results.map((a) => (
          <Link key={a.id} href={`/album/${a.id}`} className="block">
            <img src={a.image} alt={a.name} className="w-full" />
            <p className="font-bold">{a.name}</p>
            <p className="text-sm text-gray-400">{a.artist} • {a.year}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
