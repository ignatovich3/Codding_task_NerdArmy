import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(form);
      localStorage.setItem("token", token);
      navigate("/flowers");
    } catch (err) {
      alert("Nieprawidłowe dane logowania");
    }
  };

  return (
    <div className="flex justify-center items-start pt-20 min-h-[calc(100vh-80px)] bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Zaloguj się</h2>

        <input
          type="text"
          name="username"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Hasło"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
};

export default Login;
