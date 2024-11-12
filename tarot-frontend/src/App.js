import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutTarot from "./pages/AboutTarot";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import TarotCard from "./pages/TarotCard";
import TarotGallery from "./pages/TarotGallery";
import TarotSpreads from "./pages/TarotSpreads";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className={`app`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tarot" element={<AboutTarot />} />
          <Route path="/tarot/cards" element={<TarotGallery />} />
          <Route path="/tarot/cards/:cardName" element={<TarotCard />} />
          <Route path="/tarot/spreads" element={<TarotSpreads />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
