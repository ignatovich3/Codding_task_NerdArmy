import React, { useEffect, useState } from "react";
import { fetchFlowers as fetchFlowersAPI, deleteFlower } from "../api";
import { useNavigate } from "react-router-dom";

const FlowerList = () => {
  const [flowers, setFlowers] = useState([]);
  const navigate = useNavigate();

  const loadFlowers = async () => {
    try {
      const response = await fetchFlowersAPI();
      const flowerData = Array.isArray(response) ? response : response?.data;

      if (Array.isArray(flowerData)) {
        setFlowers(flowerData);
      } else {
        console.error("Invalid flower data format:", response);
      }
    } catch (err) {
      console.error("Error fetching flowers", err);
    }
  };

  useEffect(() => {
    loadFlowers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flower?")) return;
    try {
      await deleteFlower(id);
      loadFlowers();
    } catch (err) {
      alert("Error deleting flower");
    }
  };

  return (
    <div className="table-container">
      <div className="flex justify-between items-center mb-4">
        <h2>🌿 Flower List</h2>
        <button className="btn-green" onClick={() => navigate("/add")}>
          ➕ Add Flower
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flowers.length > 0 ? (
            flowers.map((flower) => (
              <tr key={flower.id}>
                <td>{flower.name}</td>
                <td>{flower.category}</td>
                <td>{flower.quantity}</td>
                <td>{flower.status}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/edit/${flower.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(flower.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-4">
                No data to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlowerList;
