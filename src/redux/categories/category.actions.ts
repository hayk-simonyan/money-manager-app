import axios from 'axios';
import {
  POST_CATEGORY,
  GET_CATEGORIES,
  PUT_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_ERROR,
} from './category.types';
import { setAlert } from '../alerts/alert.actions';

export const getCategories = () => async (dispatch: any) => {
  try {
    const res = await axios.get(
      `https://money-manager-api-v1.herokuapp.com/categories`
    );

    dispatch({
      type: GET_CATEGORIES,
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
      type: CATEGORIES_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const postCategory = (
  type: string,
  icon: string,
  name: string
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { type, icon, name };

  try {
    const res = await axios.post(
      `https://money-manager-api-v1.herokuapp.com/categories`,
      body,
      config
    );

    dispatch({
      type: POST_CATEGORY,
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
      type: CATEGORIES_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const putCategory = (
  id: string,
  type: string,
  icon: string,
  name: string
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { type, icon, name };

  try {
    const res = await axios.put(
      `https://money-manager-api-v1.herokuapp.com/categories/${id}`,
      body,
      config
    );

    dispatch({
      type: PUT_CATEGORY,
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
      type: CATEGORIES_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const deleteCategory = (id: string) => async (dispatch: any) => {
  try {
    await axios.delete(
      `https://money-manager-api-v1.herokuapp.com/categories/${id}`
    );

    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
  } catch (err) {
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
