import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import LiteraryDetail from "./pages/LiteraryDetail";
import ComparisonPage from "./pages/ComparisonPage";
import Community from "./pages/Community";
import Inspiration from "./pages/Inspiration";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/literary" element={<LiteraryDetail />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/inspiration" element={<Inspiration />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
