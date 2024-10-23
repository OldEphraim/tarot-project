import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tarot">About Tarot</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><a href="https://oldephraim.github.io" target="_blank" rel="noopener noreferrer">About Me</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;