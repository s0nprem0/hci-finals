import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

interface Work { id: string; title: string; author: string; year: number; genre: string; coverEmoji: string; }

const genres = ["All", "Tragedy", "Novel", "Romance", "Southern Gothic", "Social Realism"];

export default function Discover() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    api.literary.list()
      .then(data => { setWorks(data as Work[]); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let result = works;
    if (activeGenre !== "All") result = result.filter(w => w.genre === activeGenre);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(w =>
        w.title.toLowerCase().includes(q) || w.author.toLowerCase().includes(q)
      );
    }
    return result;
  }, [works, activeGenre, search]);

  if (error) return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="widget text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-sm text-text2">Could not load data. Is the server running?</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="page-title">Discover</h1>
        {!loading && <span className="badge-blue" aria-label={`${filtered.length} literary works`}>{filtered.length} Literary Works</span>}
      </div>
      <p className="page-subtitle">Browse literary works and their film adaptations</p>

      <div className="flex gap-3 mb-6" role="search">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title, author, director, genre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search literary works"
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-6" role="tablist" aria-label="Filter by genre">
        {genres.map(g => (
          <button
            key={g}
            role="tab"
            aria-selected={activeGenre === g}
            className={`filter-chip ${activeGenre === g ? "active" : ""}`}
            onClick={() => setActiveGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="section-header"><h2 className="section-title">📖 Literary Works</h2></div>

      {loading ? (
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-surface rounded-card overflow-hidden animate-pulse">
              <div className="h-35 bg-surface-alt" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-surface-alt rounded w-3/4" />
                <div className="h-3 bg-surface-alt rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text2 py-12 text-center">
          {search ? `No results matching "${search}"` : "No literary works found in this category."}
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filtered.map(w => (
            <Link key={w.id} to={`/literary?id=${w.id}`} className="content-card">
              <div className="h-35 flex items-center justify-center text-4xl bg-gradient-to-br from-surface to-surface-alt">
                {w.coverEmoji || "📖"}
              </div>
              <div className="p-4">
                <div className="text-base font-semibold mb-1">{w.title}</div>
                <div className="text-xs text-text2 mb-2">{w.author} · {w.year}</div>
                <span className="tag-teal">{w.genre}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
