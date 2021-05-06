import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Nav from '../components/nav/Nav';

export const PrivateRoute_ = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route component={(props) => (
      isAuthenticated ? (
        <>
          {rest.path !== '/home' ? <Nav /> : ''}
          <Component {...props} />
        </>
      ) : (
        <Redirect to="/" />
      )
    )} {...rest} />
  )
};

const mapStateToProps = ({ user }) => ({
  isAuthenticated: !!user.activeUser
});

export default connect(mapStateToProps)(PrivateRoute_);
