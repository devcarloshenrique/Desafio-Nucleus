import React, { useContext } from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';

import { Context } from './Context/AuthContext';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

function routes() {
  return (
    <div>
      <Switch>
        <CustomRoute exact path={['/', '/login']} component={Login} />
        <CustomRoute exact path="/register" component={Register} />
        <CustomRoute isPrivate exact path="/home" component={Home} />
        <CustomRoute component={NotFound} />
      </Switch>
    </div>
  );
}

export default routes;
