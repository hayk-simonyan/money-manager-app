import axios from 'axios';
import {
  GET_ACCOUNTS,
  POST_ACCOUNT,
  ACCOUNTS_ERROR,
  PUT_ACCOUNT,
  DELETE_ACCOUNT,
} from './account.types';
import { setAlert } from '../alerts/alert.actions';

export const getAccounts = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`/accounts`);

    dispatch({
      type: GET_ACCOUNTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: ACCOUNTS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const postAccount = (
  icon: string,
  name: string,
  total: string
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { icon, name, total };

  try {
    const res = await axios.post(`/accounts`, body, config);

    dispatch({
      type: POST_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: ACCOUNTS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const putAccount = (
  id: string,
  icon: string,
  name: string,
  total: string
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { icon, name, total };

  try {
    const res = await axios.put(`/accounts/${id}`, body, config);

    dispatch({
      type: PUT_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: ACCOUNTS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const deleteAccount = (id: string) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.delete(`/accounts/${id}`, config);
    console.log(res.data);

    dispatch({
      type: DELETE_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: ACCOUNTS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
