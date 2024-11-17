import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutTarot from "./pages/AboutTarot";
import CreateAccount from "./pages/CreateAccount";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SavedReading from "./pages/SavedReading";
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
          <Route path="/:username" element={<ProtectedRoute />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="/:username/favorites" element={<ProtectedRoute />}>
            <Route index element={<Favorites />} />
          </Route>
          <Route path="/:username/readings/:slug" element={<ProtectedRoute />}>
            <Route index element={<SavedReading />} />
          </Route>
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
