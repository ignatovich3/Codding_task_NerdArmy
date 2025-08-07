import React, { useState } from "react";
import { createFlower } from "../api";
import { useNavigate } from "react-router-dom";

const FlowerForm = () => {
  const [flower, setFlower] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    status: "",
    date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFlower({ ...flower, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFlower(flower);
      navigate("/list");
    } catch (err) {
      alert("Błąd podczas dodawania kwiatu");
    }
  };

  return (
    <div className="centered-form-container">
      <div className="form-box">
        <h2>Dodaj / Edytuj Kwiat</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nazwa kwiatu"
            value={flower.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Opis"
            value={flower.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Kategoria"
            value={flower.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Ilość"
            value={flower.quantity}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={flower.status}
            onChange={handleChange}
            required
          >
            <option value="">Status zapasu</option>
            <option value="Dostępny">Dostępny</option>
            <option value="Mało">Mało</option>
            <option value="Brak">Brak</option>
          </select>

          <input
            type="date"
            name="date"
            value={flower.date}
            onChange={handleChange}
          />

          <button type="submit">Zapisz</button>
        </form>
      </div>
    </div>
  );
};

export default FlowerForm;
