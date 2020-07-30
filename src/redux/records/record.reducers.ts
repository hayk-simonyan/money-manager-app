import {
  GET_RECORDS,
  POST_RECORD,
  PUT_RECORD,
  DELETE_RECORD,
  RECORDS_ERROR,
} from './record.types';

const initialState = {
  records: [],
  loading: true,
  error: {},
};

export default function (
  state = initialState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECORDS:
      return {
        ...state,
        records: payload,
        loading: false,
      };
    case POST_RECORD:
      return {
        ...state,
        records: [...state.records, payload],
        loading: false,
      };
    case PUT_RECORD:
      return {
        ...state,
        records: state.records.map((record) =>
          // @ts-ignore
          record._id === action.payload.id ? action.payload : record
        ),
        loading: false,
      };
    case DELETE_RECORD:
      return {
        ...state,
        // @ts-ignore
        records: state.records.filter((r) => r._id !== payload),
        loading: false,
      };
    case RECORDS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
