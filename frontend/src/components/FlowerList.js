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
        console.error("Nieprawidłowy format danych kwiatów:", response);
      }
    } catch (err) {
      console.error("Błąd pobierania kwiatów", err);
    }
  };

  useEffect(() => {
    loadFlowers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć ten kwiat?")) return;
    try {
      await deleteFlower(id);
      loadFlowers();
    } catch (err) {
      alert("Błąd podczas usuwania");
    }
  };

  return (
    <div className="table-container">
      <div className="flex justify-between items-center mb-4">
        <h2>🌿 Lista kwiatów</h2>
        <button className="btn-green" onClick={() => navigate("/add")}>
          ➕ Dodaj kwiat
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Kategoria</th>
            <th>Ilość</th>
            <th>Status</th>
            <th>Akcje</th>
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
                      Edytuj
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(flower.id)}
                    >
                      Usuń
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-4">
                Brak danych do wyświetlenia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlowerList;
