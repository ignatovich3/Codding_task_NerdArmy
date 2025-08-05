// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username,
        password,
      });

      // ✅ Zapisz token do localStorage
      localStorage.setItem("token", response.data.access_token);

      // ✅ Przekieruj na listę kwiatów
      navigate("/list");
    } catch (error) {
      alert("Błąd logowania");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
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
  );
};

export default Login;
