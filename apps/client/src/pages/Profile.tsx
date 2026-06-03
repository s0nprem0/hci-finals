import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <header className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal to-blue flex items-center justify-center text-3xl font-bold text-bg font-serif" aria-hidden>
          M
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="page-title">Marco</h1>
            <button className="text-text2 hover:text-teal transition-colors" aria-label="Settings">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx={12} cy={12} r={3} /></svg>
            </button>
          </div>
          <p className="text-sm text-text2 mb-3">Film Student · 21 years old</p>
          <div className="flex gap-8">
            {[{ num: 12, label: "Saved" }, { num: 8, label: "Comparisons" }, { num: 98, label: "Posts" }, { num: 3, label: "Boards" }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold">{s.num}</div>
                <div className="text-xs text-text2 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <section className="col-span-2">
          <div className="section-header"><h2 className="section-title">📚 Saved Research</h2></div>
          {[
            { title: "Romeo and Juliet", id: "1", access: "Last accessed 2 days ago", badge: "In Progress", color: "badge-teal" },
            { title: "The Great Gatsby", id: "2", access: "Last accessed 5 days ago", badge: "Completed", color: "badge-green" },
            { title: "Macbeth", id: "4", access: "Last accessed 1 week ago", badge: "Saved", color: "badge-yellow" },
          ].map((item, i) => (
            <Link key={i} to={`/literary?id=${item.id}`} className="content-card block mb-3 no-underline">
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

          <div className="section-header mt-8"><h2 className="section-title">📝 Recent Activity</h2></div>
          <div className="widget">
            {[
              { type: "review", text: "Reviewed Romeo and Juliet", time: "2 days ago", icon: "📖" },
              { type: "discussion", text: "Posted in Symbolism Discussion", time: "3 days ago", icon: "💬" },
              { type: "comparison", text: "Compared Macbeth with film adaptation", time: "5 days ago", icon: "🎬" },
              { type: "bookmark", text: "Saved The Great Gatsby", time: "1 week ago", icon: "🔖" },
            ].map((a, i) => (
              <div key={i} className="widget-item">
                <div className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden>{a.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm">{a.text}</div>
                    <div className="text-xs text-text2">{a.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside>
          <div className="widget">
            <h2 className="text-sm font-semibold mb-3 font-sans">📊 Progress</h2>
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
            <h2 className="text-sm font-semibold mb-3 font-sans">⚙️ Quick Settings</h2>
            {[
              { label: "Email Notifications", value: "On", color: "badge-green" },
              { label: "Theme", value: "Catppuccin Macchiato", color: "badge-teal" },
              { label: "Language", value: "English", color: "badge-blue" },
            ].map((s, i) => (
              <div key={i} className="widget-item">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{s.label}</span>
                  <span className={s.color}>{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
