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

interface Work { _id: string; title: string; author: string; year: number; genre: string; coverEmoji: string; }

export default function Home() {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    api.literary.featured().then(setWorks as never);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="mb-8">
        <div className="grid grid-cols-[1.5fr_1fr] gap-3 min-h-80">
          <Link to="/literary" className="hero-card min-h-80" style={{ background: gradients[0] }}>
            <div className="text-5xl opacity-40">🎭</div>
            <div className="hero-overlay">
              <span className="hero-badge">Featured</span>
              <h2 className="text-3xl font-serif">Romeo and Juliet</h2>
              <p className="text-sm opacity-80">William Shakespeare · 1597</p>
            </div>
          </Link>
          <div className="flex flex-col gap-3">
            <Link to="/literary" className="hero-card min-h-[152px]" style={{ background: gradients[1] }}>
              <div className="hero-overlay">
                <h3 className="text-lg font-serif">The Great Gatsby</h3>
                <p className="text-xs opacity-75">F. Scott Fitzgerald</p>
              </div>
            </Link>
            <Link to="/literary" className="hero-card min-h-[152px]" style={{ background: gradients[2] }}>
              <div className="hero-overlay">
                <h3 className="text-lg font-serif">To Kill a Mockingbird</h3>
                <p className="text-xs opacity-75">Harper Lee</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6">
        <div>
          <div className="section-header">
            <h2 className="section-title">📚 Featured Literary Pieces</h2>
            <Link to="/discover" className="text-sm text-teal font-medium cursor-pointer hover:opacity-70 transition-opacity">View All →</Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {works.slice(0, 3).map(w => (
              <Link key={w._id} to={`/literary?id=${w._id}`} className="content-card">
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
