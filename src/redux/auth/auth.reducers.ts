import {
  USER_LOADED,
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  PUT_EMAIL,
  PUT_EMAIL_ERROR,
  PUT_PASSWORD,
  PUT_PASSWORD_ERROR,
} from './auth.types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (
  state = initialState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case PUT_PASSWORD:
    case PUT_EMAIL:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case PUT_PASSWORD_ERROR:
    case PUT_EMAIL_ERROR:
      return {
        ...state,
        loading: false,
      };
    case SIGNUP_FAIL:
    case SIGNIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
