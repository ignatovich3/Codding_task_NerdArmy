import React, { useEffect, useState } from "react";
import { fetchFlowers as fetchFlowersAPI, deleteFlower } from "../api";
import { useNavigate } from "react-router-dom";

const FlowerList = () => {
  const [flowers, setFlowers] = useState([]);
  const navigate = useNavigate();

  // Bezpieczne pobieranie danych
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">🌿 Lista kwiatów</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/add")}
        >
          ➕ Dodaj kwiat
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="p-3 text-left">Nazwa</th>
              <th className="p-3 text-left">Kategoria</th>
              <th className="p-3 text-left">Ilość</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {flowers.length > 0 ? (
              flowers.map((flower) => (
                <tr key={flower.id} className="border-t">
                  <td className="p-3">{flower.name}</td>
                  <td className="p-3">{flower.category}</td>
                  <td className="p-3">{flower.quantity}</td>
                  <td className="p-3">{flower.status}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => navigate(`/edit/${flower.id}`)}
                    >
                      Edytuj
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(flower.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Brak danych do wyświetlenia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlowerList;
