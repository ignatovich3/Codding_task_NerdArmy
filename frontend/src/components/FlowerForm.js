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

  const categories = ["Beautiful", "Rare", "Protected"]; // Array of categories for the dropdown menu

  const handleChange = (e) => {
    setFlower({ ...flower, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFlower(flower);
      navigate("/list");
    } catch (err) {
      alert("Error while adding the flower");
    }
  };

  return (
    <div className="centered-form-container">
      <div className="form-box">
        <h2>Add</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Flower Name"
            value={flower.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={flower.description}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={flower.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={flower.quantity}
            onChange={handleChange}
            required
            min="0" // Prevents negative numbers
          />

          <select
            name="status"
            value={flower.status}
            onChange={handleChange}
            required
          >
            <option value="">Stock Status</option>
            <option value="Available">Available</option>
            <option value="Low">Low</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <input
            type="date"
            name="date"
            value={flower.date}
            onChange={handleChange}
          />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default FlowerForm;
