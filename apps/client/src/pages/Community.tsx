import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Discussion { id: string; title: string; tag: string; author: string; replyCount: number; lastPost: string; }

const tagStyles: Record<string, string> = {
  Debate: "bg-red/15 text-red",
  Review: "bg-blue/15 text-blue",
  Discussion: "bg-green/15 text-green",
  Analysis: "bg-yellow/15 text-yellow",
  Question: "bg-mauve/15 text-mauve",
};

export default function Community() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.community.list()
      .then(data => { setDiscussions(data as Discussion[]); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  if (error) return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="widget text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-sm text-text2">Could not load discussions. Is the server running?</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="page-title">Community</h1>
        <button className="btn-teal" aria-label="Start a new discussion">＋ New Discussion</button>
      </div>
      <p className="page-subtitle">Discuss literary adaptations, share analyses, and connect with peers</p>
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div>
          <div className="section-header"><h2 className="section-title">Recent Discussions</h2></div>
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-surface rounded-card p-5 border border-white/4 animate-pulse">
                  <div className="h-3 bg-surface-alt rounded w-16 mb-3" />
                  <div className="h-4 bg-surface-alt rounded w-3/4 mb-2" />
                  <div className="h-3 bg-surface-alt rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : discussions.length === 0 ? (
            <div className="widget text-center py-8">
              <p className="text-sm text-text2">No discussions yet. Be the first to start one!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {discussions.map(d => (
                <div key={d.id} className="forum-card">
                  <span className={`tag ${tagStyles[d.tag] || "bg-teal/12 text-teal"}`}>{d.tag}</span>
                  <div className="text-sm font-semibold my-1.5">{d.title}</div>
                  <div className="text-xs text-text2">{d.replyCount} replies · Last post by {d.lastPost}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="widget">
            <h2 className="text-sm font-semibold mb-3 font-sans">🏆 Top Contributors</h2>
            {["Maria · 142 posts", "Marco · 98 posts", "Sofia · 87 posts", "Jake · 65 posts", "Anna · 54 posts"].map((c, i) => (
              <div key={i} className="widget-item"><div className="widget-item-title">{i + 1}. {c}</div></div>
            ))}
          </div>
          <div className="widget">
            <h2 className="text-sm font-semibold mb-3 font-sans">📂 Groups</h2>
            {["🎭 Shakespeare Adaptations", "🇵🇭 Philippine Cinema", "📖 Modern Novel Adaptations"].map((g, i) => (
              <div key={i} className="widget-item"><div className="widget-item-title">{g}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
