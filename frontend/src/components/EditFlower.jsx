import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditFlower = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const categories = ['Piękny', 'Rzadki', 'Chroniony'];

  useEffect(() => {
    const fetchFlower = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/flowers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;

        if (data.date_added) {
          data.date_added = new Date(data.date_added).toISOString().split('T')[0];
        }

        setFlower(data);
        setLoading(false);
      } catch (err) {
        setError('Nie udało się pobrać kwiatu lub nie masz dostępu.');
        setLoading(false);
      }
    };
    fetchFlower();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlower({ ...flower, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/flowers/${id}`,
        flower,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/list');
    } catch (err) {
      setError('Błąd zapisu zmian.');
    }
  };

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!flower) return null;

  return (
    <div className="centered-form-container">
      <div className="form-box">
        <h2>Edytuj kwiat</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={flower.name}
            onChange={handleChange}
            placeholder="Nazwa"
            required
          />

          <select
            name="category"
            value={flower.category}
            onChange={handleChange}
            required
          >
            <option value="">Wybierz kategorię</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            name="quantity"
            type="number"
            value={flower.quantity}
            onChange={handleChange}
            placeholder="Ilość"
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
            name="date_added"
            type="date"
            value={flower.date_added || ''}
            onChange={handleChange}
          />

          <button type="submit">Zapisz zmiany</button>
        </form>
      </div>
    </div>
  );
};

export default EditFlower;
