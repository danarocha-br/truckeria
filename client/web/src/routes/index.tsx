import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { useDispatch } from 'react-redux';

import SignIn from '../pages/Auth/SignIn';
import Registration from '../pages/Auth/Registration';
import PasswordRecover from '../pages/Auth/PasswordRecover';
import Dashboard from '../pages/Dashboard';
import { auth, createUserProfileDocument } from '../services/utils.js';
import { setCurrentUser } from '../store/modules/auth/actions';

interface Props {
  toggleTheme(): void;
}

const Routes: React.FC<Props> = ({ toggleTheme }) => {
  const { title } = useContext(ThemeContext);

  // currentUser
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef?.onSnapshot((snapShot) => {
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            }),
          );
        });
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => unsubscribeFromAuth();
  }, [dispatch]);

  return (
    <Switch>
      <Route
        path="/login"
        // render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
        component={SignIn}
      />
      <Route path="/register" component={Registration} />
      <Route path="/forgot-password" component={PasswordRecover} />
      <Route path="/" exact component={Dashboard} />
    </Switch>
  );
};

export default Routes;
