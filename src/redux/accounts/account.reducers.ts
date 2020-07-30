import {
  GET_ACCOUNTS,
  POST_ACCOUNT,
  PUT_ACCOUNT,
  DELETE_ACCOUNT,
  ACCOUNTS_ERROR,
} from './account.types';

const initialState = {
  accounts: [],
  loading: true,
  error: {},
};

export default function (
  state = initialState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;

  switch (type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
        loading: false,
      };
    case POST_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, payload],
        loading: false,
      };
    case PUT_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          // @ts-ignore
          account._id === action.payload.id ? action.payload : account
        ),
        loading: false,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        // @ts-ignore
        accounts: state.accounts.filter((a) => a._id !== payload),
        loading: false,
      };
    case ACCOUNTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
