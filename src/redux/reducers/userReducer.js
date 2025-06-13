import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../types";

const initialState = {
  users: [],
  error: "",
  totalPages: 0,
  currentPage: 1,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return { ...state, error: action.payload, users: [] };
    default:
      return state;
  }
};

export default userReducer;
