'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

type Suggestion = { _id: string; title: string; slug: string };

export function SearchBar() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Suggestion[]>([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!q.trim()) return setResults([]);
      const res = await fetch(`${API_BASE}/products/search/autocomplete?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = (await res.json()) as Suggestion[];
        setResults(data);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [q]);

  return (
    <div className="relative w-full max-w-md">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none ring-pink-200 focus:ring"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-xl border bg-white p-2 text-sm shadow-lg">
          {results.map((item) => (
            <li key={item._id} className="rounded px-2 py-1 hover:bg-slate-50">
              <a href={`/products/${item.slug}`}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
