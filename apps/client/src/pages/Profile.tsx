import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="main">
      <div className="profile-header">
        <div className="profile-avatar-lg">M</div>
        <div>
          <h1 className="page-title" style={{ marginBottom: 4 }}>Marco</h1>
          <div style={{ fontSize: "0.9rem", color: "var(--text2)", marginBottom: 12 }}>Film Student · 21 years old</div>
          <div className="profile-stats">
            {[{ num: 12, label: "Saved" }, { num: 8, label: "Comparisons" }, { num: 98, label: "Posts" }, { num: 3, label: "Boards" }].map(s => (
              <div key={s.label} className="profile-stat"><div className="profile-stat-num">{s.num}</div><div className="profile-stat-label">{s.label}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ gap: 24 }}>
        <div>
          <div className="section-header"><h2 className="section-title">📚 Saved Research</h2></div>
          {[
            { title: "Romeo and Juliet", access: "Last accessed 2 days ago", badge: "In Progress", color: "badge-teal" },
            { title: "The Great Gatsby", access: "Last accessed 5 days ago", badge: "Completed", color: "badge-green" },
            { title: "Macbeth", access: "Last accessed 1 week ago", badge: "Saved", color: "badge-yellow" },
          ].map((item, i) => (
            <Link key={i} to="/literary" className="content-card" style={{ marginBottom: 12, textDecoration: "none" }}>
              <div className="content-card-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div className="content-card-title">{item.title}</div>
                    <div className="content-card-sub">{item.access}</div>
                  </div>
                  <span className={`badge ${item.color}`}>{item.badge}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div>
          <div className="widget">
            <div className="widget-title">📊 Progress</div>
            {[
              { label: "Literary Works Explored", value: "6/12", pct: 50, color: "var(--teal)" },
              { label: "Comparisons Made", value: "4/8", pct: 50, color: "var(--blue)" },
              { label: "Community Engagement", value: "98 posts", pct: 65, color: "var(--mauve)" },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: "0.85rem" }}>{p.label}</span>
                  <span style={{ fontSize: "0.85rem", color: p.color }}>{p.value}</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.pct}%`, background: p.color }} /></div>
              </div>
            ))}
          </div>
          <div className="widget">
            <div className="widget-title">⚙️ Preferences</div>
            {["🔔 Email Notifications", "👁️ Theme: Catppuccin Macchiato", "🌐 Language: English"].map((p, i) => (
              <div key={i} className="widget-item"><div className="widget-item-title">{p}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
