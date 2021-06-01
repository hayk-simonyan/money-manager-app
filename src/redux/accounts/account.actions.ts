import axios from 'axios';
import {
  GET_ACCOUNTS,
  POST_ACCOUNT,
  ACCOUNTS_ERROR,
  PUT_ACCOUNT,
  DELETE_ACCOUNT,
} from './account.types';
import { setAlert } from '../alerts/alert.actions';
import { getRecords } from './../records/record.actions';

export const getAccounts = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`https://moneymanager.digital/accounts`);

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

export const postAccount =
  (type: string, name: string, total: string) => async (dispatch: any) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { type, name, total };

    try {
      const res = await axios.post(
        `https://moneymanager.digital/accounts`,
        body,
        config
      );

      dispatch({
        type: POST_ACCOUNT,
        payload: res.data,
      });

      dispatch(setAlert('Account Created', ''));
      dispatch(getAccounts());
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

export const putAccount =
  (id: string, type: string, name: string, total: string) =>
  async (dispatch: any) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { type, name, total };

    try {
      const res = await axios.put(
        `https://moneymanager.digital/accounts/${id}`,
        body,
        config
      );

      dispatch({
        type: PUT_ACCOUNT,
        payload: res.data,
      });

      dispatch(setAlert('Account Updated', ''));
      dispatch(getAccounts());
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
  try {
    await axios.delete(`https://moneymanager.digital/accounts/${id}`);

    dispatch({
      type: DELETE_ACCOUNT,
      payload: id,
    });

    dispatch(setAlert('Account Removed', ''));
    dispatch(getRecords());
    dispatch(getAccounts());
  } catch (err) {
    console.log(err);
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
