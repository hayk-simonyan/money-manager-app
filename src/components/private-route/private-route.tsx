import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../redux/auth/auth.actions';

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

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  path,
  exact,
  auth: { isAuthenticated },
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        isAuthenticated ? <Component /> : <Redirect to='/signup' />
      }
    />
  );
  // return props.auth.isAuthenticated ? (
  //   <Route exact={props.exact} path={props.path} component={props.component} />
  // ) : (
  //   <Redirect to='/signup' />
  // );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
