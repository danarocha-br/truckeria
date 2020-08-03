import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />
      <Route path="/register" component={SignUp} />
    </Switch>
  );
};

export default Routes;
