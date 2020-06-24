import React from 'react';
import { RouteProps as ReactRouterProps, Route as ReactDomRoute, Redirect } from "react-router-dom";

import { store } from '../store';

interface IRouteProps extends ReactRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}



const Route: React.FC<IRouteProps> = ({isPrivate = false, component: Component, ...rest}) => {

  const { currentUser } = store.getState().auth;

  return (<ReactDomRoute {...rest} render={() => {
    return isPrivate === !!currentUser ? (
      <Component />
    ) : <Redirect to={{pathname: isPrivate ? '/login' : '/'}}/>
  }}  />);
}

export default Route;
