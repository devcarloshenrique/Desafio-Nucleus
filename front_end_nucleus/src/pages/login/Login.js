import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../api/api';

import { Context } from '../../Context/AuthContext';

import './Login.css';

const Login = () => {
  const { authenticated, handleLogin } = useContext(Context);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({});

  function handleInputChange({ target }) {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    (async () => {
      try {
        await api.post('login', form).then((response) => {
          const { data } = response;
          if (data) {
            localStorage.setItem('token', JSON.stringify(data.token));

            handleLogin();
          }
        });

        setError({});
      } catch (error) {
        setError(error.response.data.error);
      }
    })();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        <div className="login-form-field">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <label className="login-error-message">{error && error.email}</label>
        </div>
        <div className="login-form-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <label className="login-error-message">
            {error && error.password}
            {error && error.credentials}
          </label>
        </div>
        <div className="login-form-buttons">
          <button>ENTRAR</button>
          <Link to="/register">
            <button>CADASTRAR-SE</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
