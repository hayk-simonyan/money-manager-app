import axios from 'axios';
import {
  POST_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_ERROR,
  PUT_ACCOUNT,
} from './account.types';

export const getAccounts = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`/accounts`);

    dispatch({
      type: GET_ACCOUNTS,
      payload: res.data,
    });
  } catch (err) {
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
    dispatch({
      type: ACCOUNTS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const putAccount = (icon: string, name: string, total: string) => async (
  dispatch: any
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { icon, name, total };

  try {
    const res = await axios.put(`/accounts`, body, config);

    dispatch({
      type: PUT_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNTS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
