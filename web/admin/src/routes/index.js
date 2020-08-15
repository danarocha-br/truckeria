import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Route from './Route';

import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import Schedule from '../pages/Schedule';
import Menu from '../pages/Menu';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import FoodTruckSetup from '../pages/Auth/FoodTruckSetup';

import { auth, createUserProfileDocument } from '../config/Firebase/utils';

const Routes = () => {
  const [currentUser, setCurrentUser] = useState(null);

  let authListener = null;

  useEffect(() => {
    authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      setCurrentUser({ currentUser: userAuth });
    });

    return () => {
      authListener();
    };
  }, []);

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
        <Route path="/" exact component={() => <h1>404</h1>} />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
