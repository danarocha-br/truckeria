import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../store';

function PrivateRoute({ isPrivate, component: Component, ...rest }) {
  const { isAuthenticated, currentUser } = store.getState().auth;

  // const isUserAdmin = () => {
  //   if (!currentUser || !Array.isArray(currentUser.role)) {
  //     return false;
  //   }
  //   const { role } = currentUser;

  //   if (role.includes('admin')) {
  //     return true;
  //   }

  //   return false;
  // };

  if (!isAuthenticated && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  isPrivate: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  isPrivate: false,
};

export default PrivateRoute;
