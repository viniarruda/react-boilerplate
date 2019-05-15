import {LOGIN, LOGOUT} from "./actions";

export const INITIAL_STATE = {
  logged: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        logged: true
      }
    case LOGOUT:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};