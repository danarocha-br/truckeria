import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../store';

function PrivateRoute({ children, ...rest }) {
  const { signed, currentUser } = store.getState().auth;

  const isUserAdmin = () => {
    if (!currentUser || !Array.isArray(currentUser.role)) {
      return false;
    }
    const { role } = currentUser;

    if (role.includes('admin')) {
      return true;
    }

    return false;
  };
  return (
    <Route
      {...rest}
      render={({ location }) =>
        signed && isUserAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default PrivateRoute;
