import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

function PrivateRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  const isUserAdmin = (auth) => {
    if (!auth || !Array.isArray(auth.profile.role)) {
      return false;
    }
    const { role } = auth.profile;

    if (role.includes('admin')) {
      return true;
    }

    return false;
  };
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoaded(auth) && !isEmpty(auth) && isUserAdmin ? (
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
