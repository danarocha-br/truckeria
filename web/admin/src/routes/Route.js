import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RouteWrapper = ({ isPrivate = false, component: Component, ...rest }) => {
  const authenticated = false;

  if (!authenticated && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (authenticated && !isPrivate) {
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
