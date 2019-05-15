import {
  LIST_PRODUCTS_REQUESTED,
  LIST_PRODUCTS_FULFILLED,
  LIST_PRODUCTS_REJECTED
} from "./actions";

export const INITIAL_STATE = {
  list: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_PRODUCTS_REQUESTED:
      return {
        ...state,
        loading: true,
        list: null,
      };
    case LIST_PRODUCTS_FULFILLED:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    case LIST_PRODUCTS_REJECTED:
      return {
        ...INITIAL_STATE
      }
    default:
      return state;
  }
};