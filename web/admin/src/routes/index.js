import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Schedule from '../pages/Schedule';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/schedule" component={Schedule} isPrivate />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
};

export default Routes;
