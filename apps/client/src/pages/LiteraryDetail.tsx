import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../api/client";

interface Work { id: string; title: string; author: string; year: number; genre: string; description: string; coverEmoji: string; themeAnalysis: { title: string; description: string; color: string }[]; }

export default function LiteraryDetail() {
  const [params] = useSearchParams();
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAccordion, setOpenAccordion] = useState(0);

  const id = params.get("id");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    api.literary.get(id)
      .then(data => { setWork(data as Work); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [id]);

  if (!id) return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="widget text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-sm text-text2 mb-4">Select a literary work to view its details.</p>
        <Link to="/discover" className="btn-teal">Browse Works</Link>
      </div>
    </div>
  );

  if (loading) return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="grid grid-cols-[260px_1fr] gap-6">
        <div className="space-y-4">
          <div className="rounded-card bg-surface-alt animate-pulse aspect-[2/3]" />
          <div className="bg-surface rounded-card p-4 animate-pulse space-y-3">
            <div className="h-4 bg-surface-alt rounded w-3/4" />
            <div className="h-4 bg-surface-alt rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-surface-alt rounded w-1/2 animate-pulse" />
          <div className="bg-surface rounded-card p-6 animate-pulse space-y-3">
            <div className="h-4 bg-surface-alt rounded w-1/4" />
            <div className="h-3 bg-surface-alt rounded w-full" />
            <div className="h-3 bg-surface-alt rounded w-full" />
            <div className="h-3 bg-surface-alt rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="widget text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-sm text-text2">Could not load this work.</p>
        <Link to="/discover" className="btn-teal mt-4">Back to Discover</Link>
      </div>
    </div>
  );

  if (!work) return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="widget text-center py-12">
        <div className="text-4xl mb-4">📭</div>
        <p className="text-sm text-text2 mb-4">Work not found.</p>
        <Link to="/discover" className="btn-teal">Back to Discover</Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <Link to="/discover" className="back-btn" aria-label="Back to Discover">← Back to Discover</Link>
      <div className="grid grid-cols-[260px_1fr] gap-6">
        <aside className="sticky top-22 self-start">
          <div className="rounded-card overflow-hidden bg-gradient-to-br from-surface to-surface-alt aspect-[2/3] flex items-center justify-center text-6xl mb-4" aria-hidden>
            {work.coverEmoji}
          </div>
          <div className="bg-surface rounded-card p-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/4">
            <div className="detail-meta-item">
              <span className="text-lg shrink-0" aria-hidden>✍️</span>
              <div><div className="text-xs text-text2 uppercase tracking-wide">Author</div><div className="text-sm font-medium">{work.author}</div></div>
            </div>
            <div className="detail-meta-item">
              <span className="text-lg shrink-0" aria-hidden>📅</span>
              <div><div className="text-xs text-text2 uppercase tracking-wide">Year</div><div className="text-sm font-medium">{work.year}</div></div>
            </div>
            <div className="detail-meta-item">
              <span className="text-lg shrink-0" aria-hidden>🏷️</span>
              <div><div className="text-xs text-text2 uppercase tracking-wide">Genre</div><div className="text-sm font-medium"><span className="tag-teal">{work.genre}</span></div></div>
            </div>
          </div>
          <Link to="/comparison" className="btn-teal w-full justify-center mt-3 no-underline" aria-label="View film adaptation">
            🎬 View Film Adaptation
          </Link>
        </aside>
        <div>
          <h1 className="page-title" style={{ marginBottom: 16 }}>{work.title}</h1>
          <div className="bg-surface rounded-card p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/4 mb-4">
            <h2 className="text-base text-teal font-sans mb-3">Synopsis</h2>
            <p className="text-sm text-text2 leading-relaxed">{work.description}</p>
          </div>
          <div className="bg-surface rounded-card p-6 shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-white/4">
            <h2 className="text-base text-teal font-sans mb-4">🎭 Theme & Symbol Analysis</h2>
            {work.themeAnalysis?.map((t, i) => (
              <div key={i} className="border border-white/4 rounded-lg mb-2 overflow-hidden bg-surface">
                <button
                  className="w-full flex items-center gap-3 px-4.5 py-3.5 border-none bg-transparent cursor-pointer text-sm font-semibold text-text text-left font-sans hover:bg-surface-hover transition-colors"
                  onClick={() => setOpenAccordion(i === openAccordion ? -1 : i)}
                  aria-expanded={i === openAccordion}
                  aria-controls={`theme-${i}-content`}
                >
                  <span style={{ color: t.color }} aria-hidden>☑</span>
                  <span>{t.title}</span>
                  <span className={`ml-auto transition-transform duration-300 text-lg text-text2 ${i === openAccordion ? "rotate-45" : ""}`} aria-hidden>
                    {i === openAccordion ? "−" : "＋"}
                  </span>
                </button>
                {i === openAccordion && (
                  <div id={`theme-${i}-content`} className="px-4.5 pb-4.5 text-sm text-text2 leading-relaxed" role="region">
                    {t.description}
                  </div>
                )}
              </div>
            ))}
            {(!work.themeAnalysis || work.themeAnalysis.length === 0) && (
              <p className="text-sm text-text2">No theme analysis available for this work.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
