import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="centered-form-container">
      <div className="home-box">
        <h1>🌸 Flower Inventory</h1>
        <p>
          Welcome to the flower collection management app. You can browse, add,
          edit, and delete flowers — after logging in.
        </p>

        <div className="button-row">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button className="outline">Register</button>
          </Link>
        </div>

        <p className="note">
          🔒 To <strong>add</strong> or <strong>edit</strong> flowers, you need to be logged in.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
