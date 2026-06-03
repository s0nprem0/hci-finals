import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../api/client";

interface Work { _id: string; title: string; author: string; year: number; genre: string; description: string; coverEmoji: string; themeAnalysis: { title: string; description: string; color: string }[]; }

export default function LiteraryDetail() {
  const [params] = useSearchParams();
  const [work, setWork] = useState<Work | null>(null);
  const [openAccordion, setOpenAccordion] = useState(0);

  useEffect(() => {
    const id = params.get("id");
    if (id) api.literary.get(id).then(setWork as never);
  }, [params]);

  if (!work) return <div className="main"><p className="page-subtitle">Loading...</p></div>;

  return (
    <div className="main">
      <Link to="/discover" className="back-btn">← Back to Discover</Link>
      <div className="detail-grid">
        <aside className="detail-sidebar">
          <div className="detail-cover">{work.coverEmoji}</div>
          <div className="card" style={{ padding: 16 }}>
            <div className="detail-meta-item">
              <span className="detail-meta-icon">✍️</span>
              <div><div className="detail-meta-label">Author</div><div className="detail-meta-value">{work.author}</div></div>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-icon">📅</span>
              <div><div className="detail-meta-label">Year</div><div className="detail-meta-value">{work.year}</div></div>
            </div>
            <div className="detail-meta-item">
              <span className="detail-meta-icon">🏷️</span>
              <div><div className="detail-meta-label">Genre</div><div className="detail-meta-value"><span className="tag tag-teal">{work.genre}</span></div></div>
            </div>
          </div>
          <Link to="/comparison" className="btn btn-teal" style={{ width: "100%", justifyContent: "center", marginTop: 12, textDecoration: "none" }}>
            🎬 View Film Adaptation
          </Link>
        </aside>
        <div>
          <h1 className="page-title" style={{ marginBottom: 16 }}>{work.title}</h1>
          <div className="card mb-16">
            <h3 style={{ fontSize: "1rem", color: "var(--teal)", fontFamily: "Inter, sans-serif", marginBottom: 12 }}>Synopsis</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text2)", lineHeight: 1.8 }}>{work.description}</p>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1rem", color: "var(--teal)", fontFamily: "Inter, sans-serif", marginBottom: 16 }}>🎭 Theme & Symbol Analysis</h3>
            {work.themeAnalysis?.map((t, i) => (
              <div key={i} className={`accordion-item${i === openAccordion ? " open" : ""}`}>
                <button className="accordion-header" onClick={() => setOpenAccordion(i === openAccordion ? -1 : i)}>
                  <span style={{ color: t.color }}>☑</span> {t.title}
                  <span className="accordion-toggle">{i === openAccordion ? "−" : "＋"}</span>
                </button>
                <div className="accordion-body">{t.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
