import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/literary", label: "Literary" },
  { to: "/comparison", label: "Compare" },
  { to: "/community", label: "Community" },
  { to: "/inspiration", label: "Inspiration" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-surface h-16 sticky top-0 z-50 flex items-center px-8 border-b border-white/4 gap-2">
      <Link to="/" className="flex items-center gap-2.5 mr-6 cursor-pointer">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-blue flex items-center justify-center font-extrabold text-sm text-bg font-serif">
          L
        </div>
        <span className="font-serif text-lg font-bold bg-gradient-to-r from-teal to-blue bg-clip-text text-transparent">
          LitFilm
        </span>
      </Link>
      <div className="flex gap-0.5 flex-1">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              pathname === l.to
                ? "bg-teal/12 text-teal"
                : "text-text2 hover:bg-surface-hover hover:text-text"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link to="/profile" className="w-9 h-9 rounded-full bg-surface-alt flex items-center justify-center cursor-pointer text-sm hover:bg-surface-hover transition-colors">
        👤
      </Link>
    </nav>
  );
}
