import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AsmrPage from "./pages/Asmr/AsmrPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import ClickerPage from "./pages/Clicker/ClickerPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/asmr" element={<AsmrPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/clicker" element={<ClickerPage />} />
      </Routes>
    </HashRouter>
  );
}
