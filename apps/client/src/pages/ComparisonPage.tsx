import { useState } from "react";
import { Link } from "react-router-dom";

export default function Comparison() {
  const [comment, setComment] = useState("");

  return (
    <div className="main">
      <Link to="/literary" className="back-btn">← Back to Romeo and Juliet</Link>
      <h1 className="page-title">Romeo and Juliet — Text vs. Film</h1>
      <p className="page-subtitle">Act I Summary vs. Opening Scene · Romeo + Juliet (1996)</p>

      <div className="comp-grid">
        <div className="comp-panel">
          <div className="comp-panel-header">
            <span className="panel-icon">📖</span>
            <span className="panel-title">Literary Text</span>
            <span className="panel-source">Romeo and Juliet (1597)</span>
          </div>
          <div className="comp-panel-body">
            <h3>Act I, Scene I</h3>
            <p>Two households, both alike in dignity,<br />In fair Verona, where we lay our scene,<br />From ancient grudge break to new mutiny,<br />Where civil blood makes civil hands unclean.</p>
            <p>From forth the fatal loins of these two foes<br />A pair of star-cross'd lovers take their life;<br />Whose misadventured piteous overthrows<br />Do with their death bury their parents' strife.</p>
            <h3>Key Differences</h3>
            <p>The play opens with the Chorus speaking the prologue directly to the audience, while the film uses a television newscaster. The street fight becomes a gas station shootout.</p>
          </div>
        </div>

        <div className="comp-panel">
          <div className="comp-panel-header">
            <span className="panel-icon">🎬</span>
            <span className="panel-title">Film Adaptation</span>
            <span className="panel-source">Romeo + Juliet (1996)</span>
          </div>
          <div className="comp-panel-body">
            <div className="player-placeholder">
              <div className="play-btn">▶</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: 4 }}>Opening Scene Excerpt</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text3)" }}>1:41 — The gas station confrontation</div>
            </div>
            <p>Luhrmann's modern adaptation reimagines Verona as "Verona Beach," a neon-lit metropolis where the Montague-Capulet feud is portrayed as a corporate-gang war, with the Prince as a police chief.</p>
            <div className="insight-box">
              <div className="insight-label">🎯 Critical Insight</div>
              <div className="insight-text">"The film's visual language of guns, cars, and neon translates Shakespeare's dramatic intensity into a contemporary idiom without losing the power of the original text."</div>
            </div>
            <div className="divider" />
            <h4 className="comment-heading">💬 Critiques & Analysis</h4>
            <div className="comment">
              <div className="comment-avatar" style={{ background: "var(--teal)" }}>M</div>
              <div className="comment-body"><div className="comment-user">Maria</div><div className="comment-text">The film really captures the energy of the opening scene — Luhrmann's style perfectly translates Shakespeare's dramatic entrance.</div></div>
            </div>
            <div className="comment">
              <div className="comment-avatar" style={{ background: "var(--blue)" }}>J</div>
              <div className="comment-body"><div className="comment-user">Jake</div><div className="comment-text">The modern setting makes the text more accessible. Original language hits differently with contemporary visuals.</div></div>
            </div>
            <div className="comment">
              <div className="comment-avatar" style={{ background: "var(--mauve)" }}>A</div>
              <div className="comment-body"><div className="comment-user">Anna</div><div className="comment-text">The contrast between the play's poetic language and the film's fast-paced editing creates an interesting tension.</div></div>
            </div>
            <div className="comment-input-row">
              <input
                type="text"
                placeholder="Write a critique or analysis..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="comment-input"
              />
              <button className="btn btn-teal btn-circle">＋</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
