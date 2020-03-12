import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <Redirect to="/home" />
    ) : (
      <Component {...props} />
    )
  )} />
);

const mapStateToProps = ({ user }) => ({
  isAuthenticated: !!user.activeUser
});

export default connect(mapStateToProps)(PublicRoute);
