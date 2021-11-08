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
import config from '../../config';

export const signup =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(
        `${config.backendUrl}/users`,
        body,
        requestConfig
      );

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

export const signin =
  (email: string, password: string) => async (dispatch: any) => {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(
        `${config.backendUrl}/auth`,
        body,
        requestConfig
      );

      dispatch({
        type: SIGNIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());

      dispatch(setAlert('Welcome Back', 'success'));
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
  dispatch(setAlert('Logged You Out', ''));
};

export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${config.backendUrl}/auth`);

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
  const requestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.put(
      `${config.backendUrl}/auth/email`,
      body,
      requestConfig
    );

    dispatch({
      type: PUT_EMAIL,
      payload: res.data,
    });

    dispatch(setAlert('Email Updated', ''));
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

export const putPassword =
  (oldPassword: string, password: string) => async (dispatch: any) => {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ oldPassword, password });

    try {
      const res = await axios.put(
        `${config.backendUrl}/auth/password`,
        body,
        requestConfig
      );

      dispatch({
        type: PUT_PASSWORD,
        payload: res.data,
      });

      dispatch(setAlert('Password Updated', ''));
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
