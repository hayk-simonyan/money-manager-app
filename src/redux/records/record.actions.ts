import axios from 'axios';
import {
  GET_RECORDS,
  POST_RECORD,
  PUT_RECORD,
  DELETE_RECORD,
  RECORDS_ERROR,
} from './record.types';

export const getRecords = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`/records`);

    dispatch({
      type: GET_RECORDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const postRecord = (
  type: string,
  account: string,
  category: string,
  date: Date,
  amount: number,
  note: string
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { type, account, category, date, amount, note };

  try {
    const res = await axios.post(`/records`, body, config);

    dispatch({
      type: POST_RECORD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const putRecord = (
  id: string,
  type: string,
  account: string,
  category: string,
  date: Date,
  amount: number,
  note: string
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { type, account, category, date, amount, note };

  try {
    const res = await axios.put(`/records/${id}`, body, config);

    dispatch({
      type: PUT_RECORD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const deleteRecord = (id: string) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.delete(`/records/${id}`, config);

    dispatch({
      type: DELETE_RECORD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RECORDS_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
