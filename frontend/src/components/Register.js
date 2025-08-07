import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ username, email, password });
      alert("Zarejestrowano! Możesz się teraz zalogować.");
      navigate("/login");
    } catch (error) {
      console.error("Błąd rejestracji:", error.response?.data || error.message);
      alert("Rejestracja nie powiodła się.");
    }
  };

  return (
    <div className="centered-form-container">
      <div className="form-box">
        <h2>Rejestracja</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Adres e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zarejestruj się</button>
        </form>
      </div>
    </div>
  );
}
