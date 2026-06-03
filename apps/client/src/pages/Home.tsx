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
    <div className="main">
      <div className="hero">
        <div className="hero-grid">
          <Link to="/literary" className="hero-card hero-card-main" style={{ background: gradients[0] }}>
            <div className="hero-center-emoji">🎭</div>
            <div className="hero-overlay">
              <span className="hero-badge">Featured</span>
              <h2 className="hero-title">Romeo and Juliet</h2>
              <p className="hero-author">William Shakespeare · 1597</p>
            </div>
          </Link>
          <div className="hero-side">
            <Link to="/literary" className="hero-card hero-card-side" style={{ background: gradients[1] }}>
              <div className="hero-overlay">
                <h3 className="hero-title-sm">The Great Gatsby</h3>
                <p className="hero-author-sm">F. Scott Fitzgerald</p>
              </div>
            </Link>
            <Link to="/literary" className="hero-card hero-card-side" style={{ background: gradients[2] }}>
              <div className="hero-overlay">
                <h3 className="hero-title-sm">To Kill a Mockingbird</h3>
                <p className="hero-author-sm">Harper Lee</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="home-layout">
        <div>
          <div className="section-header">
            <h2 className="section-title">📚 Featured Literary Pieces</h2>
            <Link to="/discover" className="section-link">View All →</Link>
          </div>
          <div className="grid grid-3">
            {works.slice(0, 3).map(w => (
              <Link key={w._id} to={`/literary?id=${w._id}`} className="content-card">
                <div className="content-card-img" style={{ background: gradients[works.indexOf(w) % gradients.length] }}>
                  {w.coverEmoji || "📖"}
                </div>
                <div className="content-card-body">
                  <div className="content-card-title">{w.title}</div>
                  <div className="content-card-sub">{w.author} · {w.year}</div>
                  <span className="badge badge-teal">{w.genre}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <aside>
          <div className="widget">
            <div className="widget-title">💡 Recommended</div>
            <div className="widget-item">
              <div className="widget-item-title">📈 Trending Now</div>
              <div className="widget-item-sub">Noli Me Tangere — most discussed this week</div>
            </div>
            <div className="widget-item">
              <div className="widget-item-title">📄 Study Resources</div>
              <div className="widget-item-sub">Free PDF guides on literary analysis</div>
            </div>
            <div className="widget-item">
              <div className="widget-item-title">🎭 New Comparison</div>
              <div className="widget-item-sub">Macbeth: Play vs. 2015 Film</div>
            </div>
          </div>
          <div className="widget">
            <div className="widget-title">🔥 Forum Highlights</div>
            <div className="widget-item">
              <span className="badge badge-red" style={{ marginBottom: 4, display: "inline-block" }}>Debate</span>
              <div className="widget-item-title">Is Luhrmann's Gatsby faithful?</div>
            </div>
            <div className="widget-item">
              <span className="badge badge-blue" style={{ marginBottom: 4, display: "inline-block" }}>Review</span>
              <div className="widget-item-title">Why 1962 Mockingbird holds up</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
