import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import FlowerList from "./components/FlowerList";
import FlowerForm from "./components/FlowerForm";
import EditFlower from "./components/EditFlower"; // <- dodany import
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<FlowerList />} />
        <Route path="/add" element={<FlowerForm />} />
        <Route path="/edit/:id" element={<EditFlower />} /> {/* <- dodana ścieżka */}
      </Routes>
    </Router>
  );
};

export default App;
