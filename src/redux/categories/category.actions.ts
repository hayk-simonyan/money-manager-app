import axios from 'axios';
import {
  POST_CATEGORY,
  GET_CATEGORIES,
  PUT_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_ERROR,
} from './category.types';
import { setAlert } from '../alerts/alert.actions';
import config from '../../config';

export const getCategories = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`${config.backendUrl}/categories`);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err: any) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const postCategory =
  (type: string, icon: string, name: string) => async (dispatch: any) => {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { type, icon, name };

    try {
      const res = await axios.post(
        `${config.backendUrl}/categories`,
        body,
        requestConfig
      );

      dispatch({
        type: POST_CATEGORY,
        payload: res.data,
      });

      dispatch(setAlert('Category Created', ''));
    } catch (err: any) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err: { msg: string }) =>
          dispatch(setAlert(err.msg, 'danger'))
        );
      }

      dispatch({
        type: CATEGORIES_ERROR,
        payload: { msg: err.statusText, status: err.status },
      });
    }
  };

export const putCategory =
  (id: string, type: string, icon: string, name: string) =>
  async (dispatch: any) => {
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { type, icon, name };

    try {
      const res = await axios.put(
        `${config.backendUrl}/categories/${id}`,
        body,
        requestConfig
      );

      dispatch({
        type: PUT_CATEGORY,
        payload: res.data,
      });

      dispatch(setAlert('Category Updated', ''));
    } catch (err: any) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err: { msg: string }) =>
          dispatch(setAlert(err.msg, 'danger'))
        );
      }

      dispatch({
        type: CATEGORIES_ERROR,
        payload: { msg: err.statusText, status: err.status },
      });
    }
  };

export const deleteCategory = (id: string) => async (dispatch: any) => {
  try {
    await axios.delete(`${config.backendUrl}/categories/${id}`);

    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
  } catch (err: any) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err: { msg: string }) =>
        dispatch(setAlert(err.msg, 'danger'))
      );
    }

    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
