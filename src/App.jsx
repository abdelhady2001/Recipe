import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Components/Home/Home";
import MealDetails from "./Components/MealDetails/MealDetails";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="app-layout" style={{ display: "flex" }}>
        <Sidebar />

        <main className="main-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MealDetails/:id" element={<MealDetails />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
