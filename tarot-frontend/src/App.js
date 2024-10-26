import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutTarot from './pages/AboutTarot';
import Home from './pages/Home';
import Login from './pages/Login';
import TarotCard from './pages/TarotCard';
import TarotGallery from './pages/TarotGallery';
import './App.css';

const App = () => {
  const [backgroundClass, setBackgroundClass] = useState("background-image");

  return (
    <Router>
      <Navbar />
      <div className={`app ${backgroundClass}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/tarot" element={<AboutTarot />} /> 
        <Route path="/tarot/cards" element={<TarotGallery onAppear={() => setBackgroundClass("no-background")} onDisappear={() => setBackgroundClass("background-image")} />} />
        <Route path="/tarot/cards/:cardName" element={<TarotCard onAppear={() => setBackgroundClass("no-background")} onDisappear={() => setBackgroundClass("background-image")} />} />
    </Routes>
    </div>
    </Router>
  )
};

export default App;