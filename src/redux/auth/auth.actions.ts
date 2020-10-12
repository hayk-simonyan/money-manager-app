import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOGOUT,
  PUT_EMAIL,
  PUT_EMAIL_ERROR,
  PUT_PASSWORD,
  PUT_PASSWORD_ERROR,
} from './auth.types';

import { getAccounts } from '../accounts/account.actions';
import { getCategories } from '../categories/category.actions';
import { getRecords } from '../records/record.actions';
import { setAlert } from '../alerts/alert.actions';

export const signup = (name: string, email: string, password: string) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('https://money-manager-api-v1.herokuapp.com/users', body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    dispatch(setAlert('Welcome to Money Manager', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const signin = (email: string, password: string) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('https://money-manager-api-v1.herokuapp.com/auth', body, config);

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    dispatch(setAlert('Welcome back', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: SIGNIN_FAIL,
    });
  }
};

export const logout = () => (dispatch: any) => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert('Logged you out', 'success'));
};

export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('https://money-manager-api-v1.herokuapp.com/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    dispatch(getAccounts());
    dispatch(getCategories());
    dispatch(getRecords());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const putEmail = (email: string) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.put(`/auth/email`, body, config);
    console.log(res);

    dispatch({
      type: PUT_EMAIL,
      payload: res.data,
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PUT_EMAIL_ERROR,
    });
  }
};

export const putPassword = (oldPassword: string, password: string) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ oldPassword, password });

  try {
    const res = await axios.put(`/auth/password`, body, config);

    dispatch({
      type: PUT_PASSWORD,
      payload: res.data,
    });

    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PUT_PASSWORD_ERROR,
    });
  }
};
