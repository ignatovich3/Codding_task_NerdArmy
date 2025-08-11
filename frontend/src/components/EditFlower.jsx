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

  const categories = ['Beautiful', 'Rare', 'Protected'];

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
        setError('Failed to fetch flower or you do not have access.');
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
      setError('Error saving changes.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!flower) return null;

  return (
    <div className="centered-form-container">
      <div className="form-box">
        <h2>Edit Flower</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={flower.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />

          <select
            name="category"
            value={flower.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
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
            placeholder="Quantity"
            required
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
            name="date_added"
            type="date"
            value={flower.date_added || ''}
            onChange={handleChange}
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditFlower;
