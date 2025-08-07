import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="centered-form-container">
      <div className="home-box">
        <h1>🌸 Inwentaryzacja Kwiatów</h1>
        <p>
          Witamy w aplikacji do zarządzania kolekcją kwiatów. Możesz przeglądać, dodawać,
          edytować i usuwać kwiaty — po zalogowaniu się.
        </p>

        <div className="button-row">
          <Link to="/login">
            <button>Zaloguj się</button>
          </Link>
          <Link to="/register">
            <button className="outline">Zarejestruj się</button>
          </Link>
        </div>

        <p className="note">
          🔒 Aby <strong>dodawać</strong> lub <strong>edytować</strong> kwiaty, musisz być zalogowany.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
