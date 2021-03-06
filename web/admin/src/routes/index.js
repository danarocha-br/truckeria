import React from 'react';
import { Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Route from './Route';

import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';
import Dashboard from '~/pages/Dashboard';
import Schedule from '~/pages/Schedule';
import Menu from '~/pages/Menu';
import TruckProfile from '~/pages/TruckProfile';
import ForgotPassword from '~/pages/Auth/ForgotPassword';
import ResetPassword from '~/pages/Auth/ResetPassword';
import FoodTruckSetup from '~/pages/Auth/FoodTruckSetup';

const Routes = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch>
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route
          path="/create-foodtruck-account"
          component={FoodTruckSetup}
          isPrivate
        />
        <Route path="/schedule/:truck_id" component={Schedule} isPrivate />
        <Route path="/menus/:truck_id" component={Menu} isPrivate />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/truck-profile/:truck_id" component={TruckProfile} isPrivate />
        {/* <Route path="/" exact component={() => <h1>404</h1>} /> */}
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
