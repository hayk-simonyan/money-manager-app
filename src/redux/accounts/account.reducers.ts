import { GET_ACCOUNTS, POST_ACCOUNT, ACCOUNTS_ERROR } from './account.types';

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
