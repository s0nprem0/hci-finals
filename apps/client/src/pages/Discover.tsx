import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

interface Work { _id: string; title: string; author: string; year: number; genre: string; coverEmoji: string; }

const genres = ["All", "Literary Works", "Film Adaptations", "Tragedy", "Novel", "Romance", "Philippine Lit"];

export default function Discover() {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => { api.literary.list().then(setWorks as never); }, []);

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="page-title">Discover</h1>
        <span className="badge-blue">{works.length} Literary Works</span>
      </div>
      <p className="page-subtitle">Browse literary works and their film adaptations</p>

      <div className="flex gap-3 mb-6">
        <input className="search-input" type="text" placeholder="Search by title, author, director, genre..." />
        <button className="btn-teal">Search</button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {genres.map(g => (
          <span key={g} className={`filter-chip ${g === "All" ? "active" : ""}`}>{g}</span>
        ))}
      </div>

      <div className="section-header"><h2 className="section-title">📖 Literary Works</h2></div>
      <div className="grid grid-cols-4 gap-4">
        {works.map(w => (
          <Link key={w._id} to={`/literary?id=${w._id}`} className="content-card">
            <div className="h-35 flex items-center justify-center text-4xl bg-gradient-to-br from-surface to-surface-alt">{w.coverEmoji || "📖"}</div>
            <div className="p-4">
              <div className="text-base font-semibold mb-1">{w.title}</div>
              <div className="text-xs text-text2 mb-2">{w.author} · {w.year}</div>
              <span className="tag-teal">{w.genre}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
