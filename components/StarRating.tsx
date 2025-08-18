'use client';
import { useState } from 'react';

export default function StarRating({ value, onChange, disabled }: { value: number; onChange: (v: number) => void; disabled?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
  const handle = (i: number) => {
    onChange((i + 1) * 2);
  };
  return (
    <div className="flex items-center">
      {[0, 1, 2, 3, 4].map((i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onMouseEnter={() => setHover((i + 1) * 2)}
          onMouseLeave={() => setHover(null)}
          onClick={() => handle(i)}
          className={`${display >= (i + 1) * 2 ? 'text-yellow-400' : 'text-gray-600'} text-xl`}
        >
          ★
        </button>
      ))}
      <span className="ml-2 text-sm">{value.toFixed(1)}</span>
    </div>
  );
}
