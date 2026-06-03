import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Discussion { _id: string; title: string; tag: string; author: string; replyCount: number; lastPost: string; }

const tagStyles: Record<string, string> = {
  Debate: "badge-red",
  Review: "badge-blue",
  Discussion: "badge-green",
  Analysis: "badge-yellow",
  Question: "badge-mauve",
};

export default function Community() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    api.community.list().then(setDiscussions as never);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="page-title">Community</h1>
        <button className="btn-teal">＋ New Discussion</button>
      </div>
      <p className="page-subtitle">Discuss literary adaptations, share analyses, and connect with peers</p>
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div>
          <div className="section-header"><h2 className="section-title">Recent Discussions</h2></div>
          <div className="flex flex-col gap-3">
            {discussions.map(d => (
              <div key={d._id} className="forum-card">
                <span className={`tag ${tagStyles[d.tag] || "badge-teal"}`}>{d.tag}</span>
                <div className="text-sm font-semibold my-1.5">{d.title}</div>
                <div className="text-xs text-text2">{d.replyCount} replies · Last post by {d.lastPost}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="widget">
            <div className="text-sm font-semibold mb-3 font-sans">🏆 Top Contributors</div>
            {["Maria · 142 posts", "Marco · 98 posts", "Sofia · 87 posts", "Jake · 65 posts", "Anna · 54 posts"].map((c, i) => (
              <div key={i} className="widget-item"><div className="widget-item-title">{i + 1}. {c}</div></div>
            ))}
          </div>
          <div className="widget">
            <div className="text-sm font-semibold mb-3 font-sans">📂 Groups</div>
            {["🎭 Shakespeare Adaptations", "🇵🇭 Philippine Cinema", "📖 Modern Novel Adaptations"].map((g, i) => (
              <div key={i} className="widget-item"><div className="widget-item-title">{g}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
