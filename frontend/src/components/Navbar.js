// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
 // jeśli chcesz mieć oddzielny plik CSS

const Navbar = () => {
  return (
    <nav>
      <h1>🌸 Inwentaryzacja Kwiatów</h1>
      <div>
        <Link to="/">Strona główna</Link>
        <Link to="/login">Zaloguj</Link>
        <Link to="/register">Rejestracja</Link>
        <Link to="/list">Lista</Link>
        <Link to="/add">Dodaj</Link>
      </div>
    </nav>
  );
};

export default Navbar;
