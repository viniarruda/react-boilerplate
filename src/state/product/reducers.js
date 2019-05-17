import {
  LIST_PRODUCTS,
} from "./actions";

export const INITIAL_STATE = {
  list: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_PRODUCTS:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state;
  }
};