import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutTarot from './pages/AboutTarot';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tarot" element={<AboutTarot />} /> 
        <Route path="/login" element={<Login />} /> 
    </Routes>
    </div>
    </Router>
  )
};

export default App;