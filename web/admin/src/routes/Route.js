import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RouteWrapper = ({ isPrivate = true, component: Component, ...rest }) => {
  const currentUser = false;

  if (!currentUser && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (currentUser && !isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;
