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
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <div className="nav-logo-mark">L</div>
        <span className="nav-logo-text">LitFilm</span>
      </Link>
      <div className="nav-links">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link${pathname === l.to ? " active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link to="/profile" className="nav-profile">👤</Link>
    </nav>
  );
}
