import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeContext } from 'styled-components';

import SignIn from '../pages/Auth/SignIn';
import Registration from '../pages/Auth/Registration';

interface Props {
  toggleTheme(): void;
}

const Routes: React.FC<Props> = ({ toggleTheme }) => {
  const { title } = useContext(ThemeContext);

  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Registration} />
    </Switch>
  );
};

export default Routes;
