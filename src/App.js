import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Planner from "./pages/Planner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/planner" element={<Planner />} />
      </Routes>
    </Router>
  );
}

export default App;
