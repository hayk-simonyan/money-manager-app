import axios from 'axios';
import { POST_ACCOUNT, GET_ACCOUNTS, ACCOUNTS_ERROR } from './account.types';

export const postAccount = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`/accounts`, formData, config);

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

export const getAccounts = () => async (dispatch) => {
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
