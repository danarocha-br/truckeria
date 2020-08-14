import React from 'react';
import { Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Route from './Route';

import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Schedule from '../pages/Schedule';
import Menu from '../pages/Menu';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import FoodTruckSetup from '../pages/Auth/FoodTruckSetup';

const Routes = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route
          path="/create-foodtruck-account"
          component={FoodTruckSetup}
          isPrivate
        />
        <Route path="/schedule" component={Schedule} isPrivate />
        <Route path="/menu" component={Menu} isPrivate />
        <Route path="/" component={() => <h1>404</h1>} />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
