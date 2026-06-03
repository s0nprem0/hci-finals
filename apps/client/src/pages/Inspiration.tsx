const cards = [
  { icon: "🔊", type: "Sound Quote", text: "\"A plague on both your houses!\" — The desperate cry that echoes through both the play and the film, symbolizing the cost of hatred.", color: "#A6DA95" },
  { icon: "🎬", type: "Movie Still", text: "The neon cross at the Capulet party — a visual metaphor for the collision of sacred love and violent fate.", caption: "Directed by Baz Luhrmann", color: "#8AADF4" },
  { icon: "✏️", type: "User Note", text: "Character sketch: Consider how Juliet's balcony scene changes meaning when set on a swimming pool instead of a traditional balcony. Water = reflection, transparency, depth.", color: "#EED49F" },
  { icon: "🎨", type: "Visual Reference", text: "Color palette: Warm golds and deep reds dominate the film, contrasting with cool blues — visual shorthand for passion vs. fate.", color: "#C6A0F6" },
  { icon: "🔊", type: "Sound Quote", text: "\"These violent delights have violent ends\" — Friar Lawrence's warning becomes the thesis of both text and adaptation.", color: "#A6DA95" },
  { icon: "🎬", type: "Movie Still", text: "The beach confrontation at dawn — where Montague and Capulet rivalry peaks against the vast ocean.", caption: "Cinematography: Donald McAlpine", color: "#8AADF4" },
  { icon: "✏️", type: "User Note", text: "Idea: What if we mapped the emotional arc of the play against the film's color grading? The warm tones cool dramatically after Act 3.", color: "#EED49F" },
  { icon: "🎨", type: "Visual Reference", text: "Typography reference: The film uses split-screen and rapid text overlays — could inspire the comparison layout design.", color: "#C6A0F6" },
];

export default function Inspiration() {
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="page-title">🎨 Inspiration Hub</h1>
        <button className="btn-teal" aria-label="Create a new board">＋ New Board</button>
      </div>
      <p className="page-subtitle">Creative moodboards, visual references, and ideation tools</p>

      <div className="flex gap-3 mb-6" role="tablist" aria-label="Filter inspiration boards">
        {["📁 Moodboard", "🖼️ Visual Refs", "📝 Notes", "🎬 Film Stills"].map(f => (
          <button key={f} className="bg-surface rounded-lg px-5 py-3 flex items-center gap-2 cursor-pointer border border-white/4 text-sm font-sans" role="tab">
            {f}
          </button>
        ))}
      </div>

      <div className="inspo-grid">
        {cards.map((c, i) => (
          <article key={i} className="inspo-card bg-surface rounded-card p-5 mb-4 border border-white/4" style={{ borderLeft: `3px solid ${c.color}` }}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg" aria-hidden>{c.icon}</span>
              <span className="text-xs text-text3 font-medium">{c.type}</span>
            </div>
            <p className="text-sm text-text2 leading-relaxed mb-2">{c.text}</p>
            {c.caption && <footer className="text-xs text-text3 italic">{c.caption}</footer>}
          </article>
        ))}
      </div>
    </div>
  );
}
