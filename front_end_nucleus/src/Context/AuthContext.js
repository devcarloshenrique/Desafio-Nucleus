import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';
import history from './history';

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  });

  function handleLogin() {
    const token = localStorage.getItem('token');

    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

    // if (token) {
    //   api.get('user').then((response) => {
    //     const { data } = response;

    //     localStorage.setItem('user', JSON.stringify(data.user));
    //   });
    // }

    setAuthenticated(true);
    history.push('/home');
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }

  return (
    <Context.Provider
      value={{ authenticated, handleLogin, loading, handleLogout }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
