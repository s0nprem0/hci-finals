import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

interface Work { _id: string; title: string; author: string; year: number; genre: string; coverEmoji: string; }

const genres = ["All", "Literary Works", "Film Adaptations", "Tragedy", "Novel", "Romance", "Philippine Lit"];

export default function Discover() {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => { api.literary.list().then(setWorks as never); }, []);

  return (
    <div className="main">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h1 className="page-title">Discover</h1>
        <span className="badge badge-blue">{works.length} Literary Works</span>
      </div>
      <p className="page-subtitle">Browse literary works and their film adaptations</p>

      <div className="search-bar">
        <input className="search-input" type="text" placeholder="Search by title, author, director, genre..." />
        <button className="btn btn-teal">Search</button>
      </div>

      <div className="filter-chips">
        {genres.map(g => (
          <span key={g} className={`filter-chip${g === "All" ? " active" : ""}`}>{g}</span>
        ))}
      </div>

      <div className="section-header"><h2 className="section-title">📖 Literary Works</h2></div>
      <div className="grid grid-4">
        {works.map(w => (
          <Link key={w._id} to={`/literary?id=${w._id}`} className="content-card">
            <div className="content-card-img">{w.coverEmoji || "📖"}</div>
            <div className="content-card-body">
              <div className="content-card-title">{w.title}</div>
              <div className="content-card-sub">{w.author} · {w.year}</div>
              <span className="tag tag-teal">{w.genre}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
