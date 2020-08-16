import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

const RouteWrapper = ({ isPrivate = true, component: Component, ...rest }) => {
  const auth = useSelector((state) => state.firebase.auth);

  if (!isLoaded(auth) && isEmpty(auth) && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (isLoaded(auth) && !isEmpty(auth) && !isPrivate) {
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
