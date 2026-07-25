import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import KnowledgeBase from "./pages/KnowledgeBase";
import AIModels from "./pages/AIModels";
import Insights from "./pages/Insights";
import Research from "./pages/Research";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/models" element={<AIModels />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/research" element={<Research />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

