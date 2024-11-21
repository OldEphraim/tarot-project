import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useModal } from "./context/ModalContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateAccount from "./pages/CreateAccount";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import JournalEntry from "./pages/JournalEntry";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SavedReading from "./pages/SavedReading";
import TarotCard from "./pages/TarotCard";
import TarotGallery from "./pages/TarotGallery";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const { setIsModalOpen } = useModal();

  useEffect(() => {
    setIsModalOpen(false);
  }, [location, setIsModalOpen]);

  const getBackgroundStyle = () => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/create-account"
    ) {
      return {
        backgroundImage:
          "url('/esmeralda-universe-images/square-brightly-lit-generated-misty-forest.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Ensure the background spans the viewport height
      };
    }
    return {};
  };

  return (
    <>
      <Navbar />
      <div className="app" style={getBackgroundStyle()}>
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
          <Route path="/:username/favorites/:id" element={<ProtectedRoute />}>
            <Route index element={<JournalEntry />} />
          </Route>
          <Route path="/:username/readings/:slug" element={<ProtectedRoute />}>
            <Route index element={<SavedReading />} />
          </Route>
          <Route path="/tarot/cards" element={<TarotGallery />} />
          <Route path="/tarot/cards/:cardName" element={<TarotCard />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
