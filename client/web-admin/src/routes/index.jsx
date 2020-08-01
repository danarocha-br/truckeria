import React, { useEffect } from 'react';
import { Switch  } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Route from "./Route";
import SignIn from '../pages/Auth/SignIn';
import Registration from '../pages/Auth/Registration.jsx';
import PasswordRecover from '../pages/Auth/PasswordRecover';
import Dashboard from '../pages/Dashboard';
import Schedule from '../pages/Schedule';
import { auth, createUserProfileDocument } from '../services/utils.js';
import { setCurrentUser } from '../store/modules/auth/actions';

const Routes = () => {
  // const { title } = useContext(ThemeContext);

  // currentUser
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot((snapShot) => {
  //         dispatch(
  //           setCurrentUser({
  //             id: snapShot.id,
  //             ...snapShot.data(),
  //           }),
  //         );
  //       });
  //     }

  //     dispatch(setCurrentUser(userAuth));
  //   });

  //   return () => unsubscribeFromAuth();
  // }, [dispatch]);

  return (
    <Switch>
      <Route
        path="/login"
        // render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
        component={SignIn}
      />
      <Route path="/register" component={Registration} />
      <Route path="/forgot-password" component={PasswordRecover} />
      <Route path="/" exact component={Dashboard} isPrivate />
      <Route path="/schedule" component={Schedule} isPrivate/>

      {/* <Route path="/" component={() => <h1>404</h1>} isPrivate/> */}
    </Switch>
  );
};

export default Routes;
