import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

import SignIn from '../pages/Auth/SignIn';
import Registration from '../pages/Auth/Registration';
import PasswordRecover from '../pages/Auth/PasswordRecover';
import Dashboard from '../pages/Dashboard';

import { UserData } from '../pages/App';

interface Props {
  toggleTheme(): void;
  currentUser: null | UserData | firebase.User;
}

const Routes: React.FC<Props> = ({ toggleTheme, currentUser }) => {
  const { title } = useContext(ThemeContext);

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
