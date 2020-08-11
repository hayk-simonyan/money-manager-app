import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
  //   isAuthenticated: boolean;
  auth: {
    isAuthenticated: any;
    loading: boolean;
  };
}

const PrivateRoute: React.FC<Props> = (props) => {
  return props.auth.isAuthenticated ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to='/signup' />
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
