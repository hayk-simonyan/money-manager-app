import {
  GET_CATEGORIES,
  POST_CATEGORY,
  PUT_CATEGORY,
  DELETE_CATEGORY,
  CATEGORIES_ERROR,
} from './category.types';

const initialState = {
  categories: [],
  loading: true,
  error: {},
};

export default function (
  state = initialState,
  action: { type: string; payload: any }
) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case POST_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false,
      };
    case PUT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          // @ts-ignore
          category._id === payload._id ? payload : category
        ),
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        // @ts-ignore
        categories: state.categories.filter((c) => c._id !== payload),
        loading: false,
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
