import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState({
    tarot: false,
    account: false,
  });
  const [dropdownStyles, setDropdownStyles] = useState({}); 

  const dropdownRefs = useRef({ tarot: { toggle: null, menuItem: null }, account: { toggle: null, menuItem: null } });
  const navbarRef = useRef(null);

  const toggleDropdown = (menu) => {
    setShowDropdown((prev) => ({
      tarot: menu === 'tarot', 
      account: menu === 'account', 
    }));
  };

  const closeDropdowns = () => {
    setShowDropdown({
      tarot: false,
      account: false,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeDropdowns();
      }
    };
    const handleKeyPress = () => closeDropdowns();

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const newStyles = {};
    for (const key in dropdownRefs.current) {
      const ref = dropdownRefs.current[key];
      if (ref.toggle && ref.menuItem) {
        const toggleWidth = ref.toggle.offsetWidth;
        const menuItemWidth = ref.menuItem.offsetWidth;
        const offset = (menuItemWidth - toggleWidth) / 2;
        newStyles[key] = { transform: `translateX(-${offset}px)` };
      }
    }
    setDropdownStyles(newStyles);
  }, [showDropdown]);

  return (
    <nav className="navbar" ref={navbarRef}>
      <ul className="nav-links">
        <li><div className="home-link" onClick={() => closeDropdowns()}><Link to="/">Home</Link></div></li>

        <li>
          <div className="dropdown-toggle" ref={(el) => (dropdownRefs.current.tarot.toggle = el)} onClick={() => toggleDropdown('tarot')}>
            About Tarot
          </div>
          {showDropdown.tarot && (
            <ul className="dropdown-menu" style={dropdownStyles.tarot}>
              <li ref={(el) => (dropdownRefs.current.tarot.menuItem = el)}><Link to="/tarot/about">Art of Tarot</Link></li>
              <li><Link to="/tarot/spreads">Tarot Spreads</Link></li>
              <li><Link to="/tarot/cards">Tarot Cards</Link></li>
            </ul>
          )}
        </li>

        <li>
          <div className="dropdown-toggle" ref={(el) => (dropdownRefs.current.account.toggle = el)} onClick={() => toggleDropdown('account')}>
            My Account
          </div>
          {showDropdown.account && (
            <ul className="dropdown-menu">
              <li ref={(el) => (dropdownRefs.current.account.menuItem = el)}><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          )}
        </li>

        <li><div className="oldephraim-link" onClick={() => closeDropdowns()}><a href="https://oldephraim.github.io" target="_blank" rel="noopener noreferrer">About Me</a></div></li>
      </ul>
    </nav>
  );
};

export default Navbar;