import {
    GET_ACCOUNTS,
    POST_ACCOUNT,
    ACCOUNTS_ERROR
  } from './account.types''
  
  const initialState = {
    accounts: [],
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_APARTMENTS:
      case GET_ALL:
        return {
          ...state,
          apartments: payload,
          loading: false,
        };
      case GET_APARTMENT:
        return {
          ...state,
          apartments: [payload],
          loading: false,
        };
      case POST_APARTMENT:
        return {
          ...state,
          apartments: [...state.apartments, payload],
          loading: false,
        };
      case DELETE_APARTMENT:
        return {
          ...state,
          apartments: state.apartments.filter((a) => a._id !== payload),
          loading: false,
        };
      case PUT_APARTMENT:
        return {
          ...state,
          apartments: state.apartments.map(
            (apartment) =>
              apartment._id === action.payload.id
                ? //return action payload (modified item) instead of
                  //  original item when item id is updated item id
                  action.payload
                : apartment //ids not the same, return original item
          ),
          loading: false,
        };
      case APARTMENTS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  