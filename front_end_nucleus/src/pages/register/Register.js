import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

import { Context } from '../../Context/AuthContext';
import history from '../../Context/history';

import './Register.css';

const Login = () => {
  const { authenticated, handleLogin } = useContext(Context);

  const [form, setForm] = useState({
    name: '',
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
        const response = await api.post('register', form);

        alert('Usuário cadastrado com sucesso !');
        setError({});
        history.push('/home');
      } catch (error) {
        setError(error.response.data.error);
      }
    })();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Cadastro</h1>

        <div className="register-form-field">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={handleInputChange}
          />
          <label className="register-error-message">
            {error && error.name}
          </label>
        </div>
        <div className="register-form-field">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <label className="register-error-message">
            {error && error.email}
          </label>
        </div>
        <div className="register-form-field">
          <input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleInputChange}
          />
          <label className="register-error-message">
            {error && error.password}
          </label>
        </div>
        <div className="register-form-field">
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirme sua Senha"
            onChange={handleInputChange}
          />
        </div>
        <div className="register-form-buttons">
          <button>CADASTRAR</button>
          <Link to="/login">
            <button>VOLTAR</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
