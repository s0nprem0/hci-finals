import { useState } from "react";
import { Link } from "react-router-dom";

export default function Comparison() {
  const [comment, setComment] = useState("");

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <Link to="/literary" className="back-btn">← Back to Romeo and Juliet</Link>
      <h1 className="page-title">Romeo and Juliet — Text vs. Film</h1>
      <p className="page-subtitle">Act I Summary vs. Opening Scene · Romeo + Juliet (1996)</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-card overflow-hidden border border-white/4">
          <div className="comp-panel-header">
            <span>📖</span>
            <span className="text-sm font-semibold flex-1 font-sans">Literary Text</span>
            <span className="text-xs text-text3">Romeo and Juliet (1597)</span>
          </div>
          <div className="p-5 max-h-140 overflow-y-auto [&_p]:text-sm [&_p]:text-text2 [&_p]:leading-relaxed [&_p]:mb-3 [&_h3]:text-teal [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-base">
            <h3>Act I, Scene I</h3>
            <p>Two households, both alike in dignity,<br />In fair Verona, where we lay our scene,<br />From ancient grudge break to new mutiny,<br />Where civil blood makes civil hands unclean.</p>
            <p>From forth the fatal loins of these two foes<br />A pair of star-cross'd lovers take their life;<br />Whose misadventured piteous overthrows<br />Do with their death bury their parents' strife.</p>
            <h3>Key Differences</h3>
            <p>The play opens with the Chorus speaking the prologue directly to the audience, while the film uses a television newscaster. The street fight becomes a gas station shootout.</p>
          </div>
        </div>

        <div className="bg-surface rounded-card overflow-hidden border border-white/4">
          <div className="comp-panel-header">
            <span>🎬</span>
            <span className="text-sm font-semibold flex-1 font-sans">Film Adaptation</span>
            <span className="text-xs text-text3">Romeo + Juliet (1996)</span>
          </div>
          <div className="p-5 max-h-140 overflow-y-auto [&_p]:text-sm [&_p]:text-text2 [&_p]:leading-relaxed [&_p]:mb-3 [&_h3]:text-teal [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-base">
            <div className="player-placeholder">
              <div className="play-btn">▶</div>
              <div className="text-sm font-semibold mb-1">Opening Scene Excerpt</div>
              <div className="text-xs text-text3">1:41 — The gas station confrontation</div>
            </div>
            <p>Luhrmann's modern adaptation reimagines Verona as "Verona Beach," a neon-lit metropolis where the Montague-Capulet feud is portrayed as a corporate-gang war, with the Prince as a police chief.</p>
            <div className="insight-box">
              <div className="insight-label">🎯 Critical Insight</div>
              <div className="insight-text">"The film's visual language of guns, cars, and neon translates Shakespeare's dramatic intensity into a contemporary idiom without losing the power of the original text."</div>
            </div>
            <div className="h-px bg-surface-alt my-4" />
            <h4 className="text-sm font-semibold mb-3 font-sans">💬 Critiques & Analysis</h4>
            <div className="flex gap-3 mb-3">
              <div className="comment-avatar bg-teal">M</div>
              <div className="flex-1"><div className="text-xs font-semibold">Maria</div><div className="text-xs text-text2 mt-0.5">The film really captures the energy of the opening scene — Luhrmann's style perfectly translates Shakespeare's dramatic entrance.</div></div>
            </div>
            <div className="flex gap-3 mb-3">
              <div className="comment-avatar bg-blue">J</div>
              <div className="flex-1"><div className="text-xs font-semibold">Jake</div><div className="text-xs text-text2 mt-0.5">The modern setting makes the text more accessible. Original language hits differently with contemporary visuals.</div></div>
            </div>
            <div className="flex gap-3 mb-3">
              <div className="comment-avatar bg-mauve">A</div>
              <div className="flex-1"><div className="text-xs font-semibold">Anna</div><div className="text-xs text-text2 mt-0.5">The contrast between the play's poetic language and the film's fast-paced editing creates an interesting tension.</div></div>
            </div>
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Write a critique or analysis..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-full border border-surface-alt bg-surface text-text text-xs font-sans outline-none placeholder:text-text3"
              />
              <button className="btn-teal btn-circle">＋</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
