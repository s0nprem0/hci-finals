import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Discussion { _id: string; title: string; tag: string; author: string; replyCount: number; lastPost: string; }

const tagColors: Record<string, string> = {
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
    <div className="main">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h1 className="page-title">Community</h1>
        <button className="btn btn-teal">＋ New Discussion</button>
      </div>
      <p className="page-subtitle">Discuss literary adaptations, share analyses, and connect with peers</p>
      <div className="grid grid-2-1" style={{ gap: 24 }}>
        <div>
          <div className="section-header"><h2 className="section-title">Recent Discussions</h2></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {discussions.map(d => (
              <div key={d._id} className="forum-card">
                <span className={`forum-tag ${tagColors[d.tag] || "badge-teal"}`}>{d.tag}</span>
                <div className="forum-title">{d.title}</div>
                <div className="forum-meta">{d.replyCount} replies · Last post by {d.lastPost}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="widget">
            <div className="widget-title">🏆 Top Contributors</div>
            {["Maria · 142 posts", "Marco · 98 posts", "Sofia · 87 posts", "Jake · 65 posts", "Anna · 54 posts"].map((c, i) => (
              <div key={i} className="widget-item"><div className="widget-item-title">{i + 1}. {c}</div></div>
            ))}
          </div>
          <div className="widget">
            <div className="widget-title">📂 Groups</div>
            {["🎭 Shakespeare Adaptations", "🇵🇭 Philippine Cinema", "📖 Modern Novel Adaptations"].map((g, i) => (
              <div key={i} className="widget-item"><div className="widget-item-title">{g}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
