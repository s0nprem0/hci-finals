import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal to-blue flex items-center justify-center text-3xl font-bold text-bg font-serif">
          M
        </div>
        <div>
          <h1 className="page-title">Marco</h1>
          <div className="text-sm text-text2 mb-3">Film Student · 21 years old</div>
          <div className="flex gap-8">
            {[{ num: 12, label: "Saved" }, { num: 8, label: "Comparisons" }, { num: 98, label: "Posts" }, { num: 3, label: "Boards" }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold">{s.num}</div>
                <div className="text-xs text-text2 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="section-header"><h2 className="section-title">📚 Saved Research</h2></div>
          {[
            { title: "Romeo and Juliet", access: "Last accessed 2 days ago", badge: "In Progress", color: "badge-teal" },
            { title: "The Great Gatsby", access: "Last accessed 5 days ago", badge: "Completed", color: "badge-green" },
            { title: "Macbeth", access: "Last accessed 1 week ago", badge: "Saved", color: "badge-yellow" },
          ].map((item, i) => (
            <Link key={i} to="/literary" className="content-card block mb-3 no-underline">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-base font-semibold mb-1">{item.title}</div>
                    <div className="text-xs text-text2">{item.access}</div>
                  </div>
                  <span className={item.color}>{item.badge}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div>
          <div className="widget">
            <div className="text-sm font-semibold mb-3 font-sans">📊 Progress</div>
            {[
              { label: "Literary Works Explored", value: "6/12", pct: 50, color: "text-teal" },
              { label: "Comparisons Made", value: "4/8", pct: 50, color: "text-blue" },
              { label: "Community Engagement", value: "98 posts", pct: 65, color: "text-mauve" },
            ].map((p, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{p.label}</span>
                  <span className={`text-sm ${p.color}`}>{p.value}</span>
                </div>
                <div className="progress-bar">
                  <div className={`progress-fill ${i === 0 ? "bg-teal" : i === 1 ? "bg-blue" : "bg-mauve"}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="widget">
            <div className="text-sm font-semibold mb-3 font-sans">⚙️ Preferences</div>
            {["🔔 Email Notifications", "👁️ Theme: Catppuccin Macchiato", "🌐 Language: English"].map((p, i) => (
              <div key={i} className="widget-item"><div className="widget-item-title">{p}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
