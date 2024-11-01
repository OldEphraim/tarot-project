import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutTarot from './pages/AboutTarot';
import Home from './pages/Home';
import Login from './pages/Login';
import TarotCard from './pages/TarotCard';
import TarotGallery from './pages/TarotGallery';
import TarotSpreads from './pages/TarotSpreads';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className={`app`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/tarot" element={<AboutTarot />} /> 
        <Route path="/tarot/cards" element={<TarotGallery />} />
        <Route path="/tarot/cards/:cardName" element={<TarotCard />} />
        <Route path="/tarot/spreads" element={<TarotSpreads />} />
    </Routes>
    </div>
    </Router>
  )
};

export default App;