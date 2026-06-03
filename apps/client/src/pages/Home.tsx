import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

const gradients = [
  "linear-gradient(135deg,#1a3a3a,#2d5a5a)",
  "linear-gradient(135deg,#1a2a3a,#2d4a5a)",
  "linear-gradient(135deg,#2a1a3a,#4a2d5a)",
  "linear-gradient(135deg,#3a2a1a,#5a3a2a)",
  "linear-gradient(135deg,#1a2a2a,#2a4a4a)",
  "linear-gradient(135deg,#2a2a1a,#4a4a2a)",
];

interface Work { id: string; title: string; author: string; year: number; genre: string; coverEmoji: string; }

export default function Home() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.literary.featured()
      .then(data => { setWorks(data as Work[]); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

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
      <h1 className="sr-only">LitFilm — Literary vs Film Adaptation Platform</h1>

      {loading ? (
        <div className="mb-8">
          <div className="grid grid-cols-[1.5fr_1fr] gap-3 min-h-80">
            <div className="rounded-2xl bg-surface animate-pulse min-h-80" />
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-surface animate-pulse min-h-[152px]" />
              <div className="rounded-2xl bg-surface animate-pulse min-h-[152px]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <div className="grid grid-cols-[1.5fr_1fr] gap-3 min-h-80">
            <Link to={works[0] ? `/literary?id=${works[0].id}` : "#"} className="hero-card min-h-80" style={{ background: gradients[0] }}>
              <div className="text-5xl opacity-40">{works[0]?.coverEmoji || "🎭"}</div>
              <div className="hero-overlay">
                <span className="hero-badge">Featured</span>
                <h2 className="text-3xl font-serif">{works[0]?.title || "Romeo and Juliet"}</h2>
                <p className="text-sm opacity-80">{works[0] ? `${works[0].author} · ${works[0].year}` : "William Shakespeare · 1597"}</p>
              </div>
            </Link>
            <div className="flex flex-col gap-3">
              <Link to={works[1] ? `/literary?id=${works[1].id}` : "#"} className="hero-card min-h-[152px]" style={{ background: gradients[1] }}>
                <div className="hero-overlay">
                  <h3 className="text-lg font-serif">{works[1]?.title || "The Great Gatsby"}</h3>
                  <p className="text-xs opacity-75">{works[1]?.author || "F. Scott Fitzgerald"}</p>
                </div>
              </Link>
              <Link to={works[2] ? `/literary?id=${works[2].id}` : "#"} className="hero-card min-h-[152px]" style={{ background: gradients[2] }}>
                <div className="hero-overlay">
                  <h3 className="text-lg font-serif">{works[2]?.title || "To Kill a Mockingbird"}</h3>
                  <p className="text-xs opacity-75">{works[2]?.author || "Harper Lee"}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-[1fr_300px] gap-6">
        <div>
          <div className="section-header">
            <h2 className="section-title">📚 Featured Literary Pieces</h2>
            <Link to="/discover" className="text-sm text-teal font-medium cursor-pointer hover:opacity-70 transition-opacity">View All →</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-surface rounded-card overflow-hidden animate-pulse">
                  <div className="h-35 bg-surface-alt" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-surface-alt rounded w-3/4" />
                    <div className="h-3 bg-surface-alt rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : works.length === 0 ? (
            <p className="text-sm text-text2 py-8 text-center">No literary works found yet.</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {works.slice(0, 3).map(w => (
                <Link key={w.id} to={`/literary?id=${w.id}`} className="content-card">
                  <div className="h-35 flex items-center justify-center text-4xl" style={{ background: gradients[works.indexOf(w) % gradients.length] }}>
                    {w.coverEmoji || "📖"}
                  </div>
                  <div className="p-4">
                    <div className="text-base font-semibold mb-1">{w.title}</div>
                    <div className="text-xs text-text2 mb-2">{w.author} · {w.year}</div>
                    <span className="badge-teal">{w.genre}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <aside>
          <div className="widget">
            <div className="text-sm font-semibold mb-3 font-sans">💡 Recommended</div>
            <div className="widget-item">
              <div className="widget-item-title">📈 Trending Now</div>
              <div className="text-xs text-text2 mt-0.5">Noli Me Tangere — most discussed this week</div>
            </div>
            <div className="widget-item">
              <div className="widget-item-title">📄 Study Resources</div>
              <div className="text-xs text-text2 mt-0.5">Free PDF guides on literary analysis</div>
            </div>
            <div className="widget-item">
              <div className="widget-item-title">🎭 New Comparison</div>
              <div className="text-xs text-text2 mt-0.5">Macbeth: Play vs. 2015 Film</div>
            </div>
          </div>
          <div className="widget">
            <div className="text-sm font-semibold mb-3 font-sans">🔥 Forum Highlights</div>
            <div className="widget-item">
              <span className="badge-red" style={{ marginBottom: 4, display: "inline-block" }}>Debate</span>
              <div className="widget-item-title">Is Luhrmann's Gatsby faithful?</div>
            </div>
            <div className="widget-item">
              <span className="badge-blue" style={{ marginBottom: 4, display: "inline-block" }}>Review</span>
              <div className="widget-item-title">Why 1962 Mockingbird holds up</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
