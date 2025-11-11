import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h1>EventEase</h1>
      </div>
      <ul className="nav-links">
        <li><a>Home</a></li>
        <li><a>About</a></li>
        <li><a>Blog</a></li>
        <li><a>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
