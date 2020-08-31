import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../redux/auth/auth.actions';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
  auth: {
    isAuthenticated: any;
    loading: boolean;
  };
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component /> : <Redirect to='/signup' />
      }
    />
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
