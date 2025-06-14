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
  count: 0,
  perPage: 0
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
        count: action.payload?.count,
        perPage: action.payload?.perPage,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return { ...state, error: action.payload, users: [], count: 0 };
    default:
      return state;
  }


};

export default userReducer;
