import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { history } from '../store/store';

import Nav from '../components/nav/Nav';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <>
        {history.location.pathname !== '/home' ? <Nav /> : ''}
        <Component {...props} />
      </>
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const mapStateToProps = ({ user }) => ({
  isAuthenticated: !!user.activeUser
});

export default connect(mapStateToProps)(PrivateRoute);
