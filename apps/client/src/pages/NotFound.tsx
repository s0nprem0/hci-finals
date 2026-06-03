import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="widget text-center py-16">
        <div className="text-6xl mb-4">🔮</div>
        <h1 className="page-title">Page Not Found</h1>
        <p className="text-sm text-text2 mb-6 mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-teal">Back to Home</Link>
      </div>
    </div>
  );
}
