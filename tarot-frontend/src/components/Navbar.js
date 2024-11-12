import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { username, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState({
    tarot: false,
    account: false,
  });
  const [dropdownStyles, setDropdownStyles] = useState({});
  const [isDropdownPositioned, setIsDropdownPositioned] = useState(false);

  const dropdownRefs = useRef({
    tarot: { toggle: null, menuItem: null },
    account: { toggle: null, menuItem: null },
  });
  const navbarRef = useRef(null);

  const toggleDropdown = (menu) => {
    setIsDropdownPositioned(false);
    setShowDropdown((prev) => ({
      tarot: menu === "tarot",
      account: menu === "account",
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

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keypress", handleKeyPress);
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
    setIsDropdownPositioned(true);
  }, [showDropdown]);

  const handleNavbarClick = (e) => {
    if (e.target.tagName !== "LI" && e.target.tagName !== "A") {
      closeDropdowns();
    }
  };

  return (
    <nav className="navbar" ref={navbarRef} onClick={handleNavbarClick}>
      <ul className="nav-links">
        <li onClick={(e) => e.stopPropagation()}>
          <div className="home-link" onClick={() => closeDropdowns()}>
            <Link to="/">Home</Link>
          </div>
        </li>

        <li onClick={(e) => e.stopPropagation()}>
          <div
            className="dropdown-toggle"
            ref={(el) => (dropdownRefs.current.tarot.toggle = el)}
            onClick={() => toggleDropdown("tarot")}
          >
            About Tarot
          </div>
          {showDropdown.tarot && (
            <ul
              className="dropdown-menu"
              style={{
                ...dropdownStyles.tarot,
                visibility: isDropdownPositioned ? "visible" : "hidden",
              }}
            >
              <li
                ref={(el) => (dropdownRefs.current.tarot.menuItem = el)}
                onClick={() => closeDropdowns()}
              >
                <Link to="/tarot/about">Art of Tarot</Link>
              </li>
              <li onClick={() => closeDropdowns()}>
                <Link to="/tarot/spreads">Tarot Spreads</Link>
              </li>
              <li onClick={() => closeDropdowns()}>
                <Link to="/tarot/cards">Tarot Cards</Link>
              </li>
            </ul>
          )}
        </li>

        <li onClick={(e) => e.stopPropagation()}>
          <div
            className="dropdown-toggle"
            ref={(el) => (dropdownRefs.current.account.toggle = el)}
            onClick={() => toggleDropdown("account")}
          >
            My Account
          </div>
          {showDropdown.account && !username && (
            <ul
              className="dropdown-menu"
              style={{
                ...dropdownStyles.account,
                visibility: isDropdownPositioned ? "visible" : "hidden",
              }}
            >
              <li
                ref={(el) => (dropdownRefs.current.account.menuItem = el)}
                onClick={() => closeDropdowns()}
              >
                <Link to="/login">Login</Link>
              </li>
              <li onClick={() => closeDropdowns()}>
                <Link to="/create-account">Sign Up</Link>
              </li>
            </ul>
          )}
          {showDropdown.account && username && (
            <ul
              className="dropdown-menu"
              style={{
                ...dropdownStyles.account,
                visibility: isDropdownPositioned ? "visible" : "hidden",
              }}
            >
              <li
                ref={(el) => (dropdownRefs.current.account.menuItem = el)}
                onClick={() => closeDropdowns()}
              >
                <Link to="/profile">Profile</Link>
              </li>
              <li
                onClick={() => {
                  closeDropdowns();
                  logout(); // Call logout function from useAuth
                }}
              >
                <Link to="/">Logout</Link>
              </li>
            </ul>
          )}
        </li>

        <li onClick={(e) => e.stopPropagation()}>
          <div className="oldephraim-link" onClick={() => closeDropdowns()}>
            <a
              href="https://oldephraim.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              About Me
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
