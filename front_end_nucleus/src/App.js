import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './Context/history';

// import 'bootstrap/dist/css/bootstrap.css';

import './App.css';


import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
