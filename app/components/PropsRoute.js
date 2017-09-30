// @flow
import React from 'react';
import { Route } from 'react-router-native';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

export default ({ component, ...rest }) => (
  <Route {...rest} render={routeProps =>
    renderMergedProps(component, routeProps, rest)
  }/>
);
