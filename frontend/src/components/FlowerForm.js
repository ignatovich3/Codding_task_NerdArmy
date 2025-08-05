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
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-xl"
      >
        <h2 className="text-2xl font-semibold mb-6">Dodaj / Edytuj Kwiat</h2>

        <input
          type="text"
          name="name"
          placeholder="Nazwa kwiatu"
          value={flower.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Opis"
          value={flower.description}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Kategoria"
          value={flower.category}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Ilość"
          value={flower.quantity}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <select
          name="status"
          value={flower.status}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
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
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Zapisz
        </button>
      </form>
    </div>
  );
};

export default FlowerForm;
