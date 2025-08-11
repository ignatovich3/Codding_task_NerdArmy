import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To hold any error messages
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation for password length
    if (password.length < 6) {
      setError("Hasło musi zawierać co najmniej 6 znaków.");
      return;
    }

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
            minLength="6" // Ensures the password is at least 6 characters
          />

          {error && <p className="error-message">{error}</p>} {/* Display error message if password is too short */}

          <button type="submit">Zarejestruj się</button>
        </form>
      </div>
    </div>
  );
}
