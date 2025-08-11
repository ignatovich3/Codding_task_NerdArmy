// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
// If you want a separate CSS file

const Navbar = () => {
  return (
    <nav>
      <h1>🌸 Flower Inventory</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/list">List</Link>
        <Link to="/add">Add</Link>
      </div>
    </nav>
  );
};

export default Navbar;
