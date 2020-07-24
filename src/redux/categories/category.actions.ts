import axios from 'axios';
import {
  POST_CATEGORY,
  GET_CATEGORIES,
  PUT_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_ERROR,
} from './category.types';

export const getCategories = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`/categories`);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
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
    const res = await axios.post(`/categories`, body, config);

    dispatch({
      type: POST_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
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
    const res = await axios.put(`/categories/${id}`, body, config);

    dispatch({
      type: PUT_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

export const deleteCategory = (id: string) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.delete(`/categories/${id}`, config);

    dispatch({
      type: DELETE_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
