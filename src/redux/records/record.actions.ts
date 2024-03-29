import axios from 'axios';
import {
  GET_RECORDS,
  GET_RECORD,
  POST_RECORD,
  PUT_RECORD,
  DELETE_RECORD,
  RECORDS_ERROR,
} from './record.types';
import { setAlert } from '../alerts/alert.actions';
import { getAccounts } from './../accounts/account.actions';
import config from '../../config';
import { Record } from '../../types/common';

export const getRecords =
  (y: string = '', m: string = '') =>
  async (dispatch: any) => {
    try {
      let gte;
      let lt;

      // build default query if no month specified
      if (y === '' || m === '') {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        gte = new Date(year, month, 1);
        lt = new Date(year, month + 1, 1);
      } else {
        gte = new Date(parseInt(y), parseInt(m), 1);
        lt = new Date(parseInt(y), parseInt(m) + 1, 1);
      }

      let query = `?date[gte]=${gte}&date[lt]=${lt}`;
      // query = `?date[gte]=${year}-${thisMonth}-01T00:00:00.000Z&date[lt]=${year}-${nextMonth}-01T00:00:00.000Z`;

      const res = await axios.get(`${config.backendUrl}/records${query}`);

      dispatch({
        type: GET_RECORDS,
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
        type: RECORDS_ERROR,
        payload: { msg: err.statusText, status: err.status },
      });
    }
  };

export const getRecord = (id: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${config.backendUrl}/records/${id}`);

    dispatch({
      type: GET_RECORD,
      payload: res.data.record,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const postRecord = (record: Record) => async (dispatch: any) => {
  const requestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = {
    type: record.type,
    accountId: record.account,
    categoryId: record.category,
    date: record.date,
    amount: record.amount,
    note: record.note,
  };

  try {
    const res = await axios.post(
      `${config.backendUrl}/records`,
      body,
      requestConfig
    );

    dispatch({
      type: POST_RECORD,
      payload: res.data,
    });

    dispatch(getRecords());
    dispatch(getAccounts());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const putRecord =
  (
    id: string,
    type: string,
    account: string,
    category: string,
    date: Date,
    amount: number,
    note: string,
    prevAccount?: string
  ) =>
  async (dispatch: any) => {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = {
      type: type,
      accountId: account,
      categoryId: category,
      date: date,
      amount: amount,
      note: note,
      prevAccountId: prevAccount,
    };

    try {
      const res = await axios.put(
        `${config.backendUrl}/records/${id}`,
        body,
        requestConfig
      );

      return dispatch({
        type: PUT_RECORD,
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
        type: RECORDS_ERROR,
        payload: { msg: err.statusText, status: err.status },
      });
    }
  };

export const deleteRecord = (id: string) => async (dispatch: any) => {
  try {
    await axios.delete(`${config.backendUrl}/records/${id}`);

    dispatch({
      type: DELETE_RECORD,
      payload: id,
    });

    dispatch(getRecords());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
