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

  if (!work) return <div className="max-w-[1400px] mx-auto p-8"><p className="page-subtitle">Loading...</p></div>;

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <Link to="/discover" className="back-btn">← Back to Discover</Link>
      <div className="grid grid-cols-[260px_1fr] gap-6">
        <aside className="sticky top-22 self-start">
          <div className="rounded-card overflow-hidden bg-gradient-to-br from-surface to-surface-alt aspect-[2/3] flex items-center justify-center text-6xl mb-4">
            {work.coverEmoji}
          </div>
          <div className="bg-surface rounded-card p-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/4">
            <div className="detail-meta-item">
              <span className="text-lg shrink-0">✍️</span>
              <div><div className="text-xs text-text2 uppercase tracking-wide">Author</div><div className="text-sm font-medium">{work.author}</div></div>
            </div>
            <div className="detail-meta-item">
              <span className="text-lg shrink-0">📅</span>
              <div><div className="text-xs text-text2 uppercase tracking-wide">Year</div><div className="text-sm font-medium">{work.year}</div></div>
            </div>
            <div className="detail-meta-item">
              <span className="text-lg shrink-0">🏷️</span>
              <div><div className="text-xs text-text2 uppercase tracking-wide">Genre</div><div className="text-sm font-medium"><span className="tag-teal">{work.genre}</span></div></div>
            </div>
          </div>
          <Link to="/comparison" className="btn-teal w-full justify-center mt-3 no-underline">
            🎬 View Film Adaptation
          </Link>
        </aside>
        <div>
          <h1 className="page-title" style={{ marginBottom: 16 }}>{work.title}</h1>
          <div className="bg-surface rounded-card p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/4 mb-4">
            <h3 className="text-base text-teal font-sans mb-3">Synopsis</h3>
            <p className="text-sm text-text2 leading-relaxed">{work.description}</p>
          </div>
          <div className="bg-surface rounded-card p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/4">
            <h3 className="text-base text-teal font-sans mb-4">🎭 Theme & Symbol Analysis</h3>
            {work.themeAnalysis?.map((t, i) => (
              <div key={i} className="border border-white/4 rounded-lg mb-2 overflow-hidden bg-surface">
                <button className="w-full flex items-center gap-3 px-4.5 py-3.5 border-none bg-transparent cursor-pointer text-sm font-semibold text-text text-left font-sans hover:bg-surface-hover transition-colors" onClick={() => setOpenAccordion(i === openAccordion ? -1 : i)}>
                  <span style={{ color: t.color }}>☑</span> {t.title}
                  <span className={`ml-auto transition-transform duration-300 text-lg text-text2 ${i === openAccordion ? "rotate-45" : ""}`}>
                    {i === openAccordion ? "−" : "＋"}
                  </span>
                </button>
                {i === openAccordion && (
                  <div className="px-4.5 pb-4.5 text-sm text-text2 leading-relaxed">{t.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
