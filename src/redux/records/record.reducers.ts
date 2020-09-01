import {
  GET_RECORDS,
  POST_RECORD,
  PUT_RECORD,
  DELETE_RECORD,
  RECORDS_ERROR,
} from './record.types';

const initialState = {
  records: [],
  incomes: 0,
  expences: 0,
  recordsByCategories: [],
  cashflow: [],
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
        records: payload.records,
        incomes: parseInt(payload.incomes),
        expences: parseInt(payload.expences),
        recordsByCategories: payload.recordsByCategories,
        cashflow: payload.cashflow,
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
        records: state.records.map((record) => {
          // @ts-ignore
          console.log(record._id);
          console.log(payload._id);
          // @ts-ignore
          console.log(record._id === payload._id);
          // @ts-ignore
          return record._id === payload._id ? payload : record;
        }),
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
