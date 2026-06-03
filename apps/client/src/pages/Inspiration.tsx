const cards = [
  { icon: "🔊", type: "Sound Quote", text: "\"A plague on both your houses!\" — The desperate cry that echoes through both the play and the film, symbolizing the cost of hatred.", color: "var(--green)" },
  { icon: "🎬", type: "Movie Still", text: "The neon cross at the Capulet party — a visual metaphor for the collision of sacred love and violent fate.", caption: "Directed by Baz Luhrmann", color: "var(--blue)" },
  { icon: "✏️", type: "User Note", text: "Character sketch: Consider how Juliet's balcony scene changes meaning when set on a swimming pool instead of a traditional balcony. Water = reflection, transparency, depth.", color: "var(--yellow)" },
  { icon: "🎨", type: "Visual Reference", text: "Color palette: Warm golds and deep reds dominate the film, contrasting with cool blues — visual shorthand for passion vs. fate.", color: "var(--mauve)" },
  { icon: "🔊", type: "Sound Quote", text: "\"These violent delights have violent ends\" — Friar Lawrence's warning becomes the thesis of both text and adaptation.", color: "var(--green)" },
  { icon: "🎬", type: "Movie Still", text: "The beach confrontation at dawn — where Montague and Capulet rivalry peaks against the vast ocean.", caption: "Cinematography: Donald McAlpine", color: "var(--blue)" },
  { icon: "✏️", type: "User Note", text: "Idea: What if we mapped the emotional arc of the play against the film's color grading? The warm tones cool dramatically after Act 3.", color: "var(--yellow)" },
  { icon: "🎨", type: "Visual Reference", text: "Typography reference: The film uses split-screen and rapid text overlays — could inspire the comparison layout design.", color: "var(--mauve)" },
];

export default function Inspiration() {
  return (
    <div className="main">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h1 className="page-title">🎨 Inspiration Hub</h1>
        <button className="btn btn-teal">＋ New Board</button>
      </div>
      <p className="page-subtitle">Creative moodboards, visual references, and ideation tools</p>

      <div className="folder-row">
        {["📁 Moodboard", "🖼️ Visual Refs", "📝 Notes", "🎬 Film Stills"].map(f => (
          <div key={f} className="folder-chip">{f}</div>
        ))}
      </div>

      <div className="inspo-grid">
        {cards.map((c, i) => (
          <div key={i} className="inspo-card" style={{ borderLeft: `3px solid ${c.color}` }}>
            <div className="inspo-card-header">
              <span className="inspo-card-icon">{c.icon}</span>
              <span className="inspo-card-type">{c.type}</span>
            </div>
            <div className="inspo-card-text">{c.text}</div>
            {c.caption && <div className="inspo-card-caption">{c.caption}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
