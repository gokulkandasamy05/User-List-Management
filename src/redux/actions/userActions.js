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
      const response = await Axios.get(`/users?per_page=${page}`);
      console.log(response);
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: {
          users: response?.data?.data??[],
          totalPages: response?.data?.total_pages??0,
          currentPage: response?.data?.page??0,
          count: response?.data?.total??0,
          perPage: response?.data?.per_page??0
        },
      });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    } finally {
      dispatch(setLoadingFalse());
    }
  };
};
