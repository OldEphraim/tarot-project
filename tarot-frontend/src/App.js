import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import SpreadInfo from './components/SpreadInfo';
import SpreadSelector from './components/SpreadSelector';
import CardDisplay from './components/CardDisplay';
import AboutTarot from './pages/AboutTarot';
import Login from './pages/Login';
import './App.css';

const App = () => {
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [cards, setCards] = useState([]);

  const handleSpreadSelect = async (spread) => {
    setSelectedSpread(spread);
    let numCards;

    // Determine the number of cards based on the spread
    if (spread === "Three-Card Spread") {
      numCards = 3;
    } else if (spread === "Celtic Cross") {
      numCards = 10; // Assuming a Celtic Cross uses 10 cards
    } else {
      numCards = 5; // Default for others
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/draw-multiple?count=${numCards}`);
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
    <div className="app">
      <h1>Tarot Card Reader</h1>
        <SpreadInfo />
        <SpreadSelector onSelect={handleSpreadSelect} />
      {selectedSpread && <><h2>You selected: {selectedSpread}</h2>
      {cards.length > 0 && <CardDisplay cards={cards} selectedSpread={selectedSpread} />} </>}
    </div>} />
    <Route path="/tarot" element={<AboutTarot />} /> 
        <Route path="/login" element={<Login />} /> 
    </Routes>
    </Router>
  )
};

export default App;