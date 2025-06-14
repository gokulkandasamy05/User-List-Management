import Axios from "../../utils/axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../types";
import { setLoadingFalse, setLoadingTrue } from "./loaderActions";



export const fetchUsers = (page = 1) => {
  return async (dispatch) => {
    dispatch(setLoadingTrue());
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
      const response = await Axios.get(`/users?page=${page}`);
      console.log(response);
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: {
          users: response?.data?.data,
          totalPages: response?.data?.total_pages,
          currentPage: response?.data?.page,
          count: response?.data?.total,
          perPage: response?.data?.per_page
        },
      });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    } finally {
      dispatch(setLoadingFalse());
    }
  };
};
