import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PrivateRoute from './Route';

import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Dashboard from '../pages/Dashboard';
import Schedule from '../pages/Schedule';
import Menu from '../pages/Menu';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import FoodTruckSetup from '../pages/Auth/FoodTruckSetup';

const Routes = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch>
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute
          path="/create-foodtruck-account"
          component={FoodTruckSetup}
        />
        <PrivateRoute path="/schedule" component={Schedule} />
        <PrivateRoute path="/menu" component={Menu} />
        <PrivateRoute path="/" exact component={Dashboard} />
        {/* <Route path="/" exact component={() => <h1>404</h1>} /> */}
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
