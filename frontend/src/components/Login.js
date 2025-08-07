import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // twoja funkcja z api.js

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ username, password });
      localStorage.setItem("token", response.data.access_token);
      alert("Zalogowano pomyślnie!");
      navigate("/");
    } catch (error) {
      console.error("Błąd logowania:", error.response?.data || error.message);
      alert("Niepoprawne dane logowania.");
    }
  };

  return (
    <div className="centered-form-container">
      <div className="form-box">
        <h2>Logowanie</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zaloguj się</button>
        </form>
      </div>
    </div>
  );
}
