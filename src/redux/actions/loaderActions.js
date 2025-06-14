import { SET_LOADING_FALSE, SET_LOADING_TRUE } from "../types"

export const setLoadingTrue = () => ({type:SET_LOADING_TRUE})
export const setLoadingFalse = () => ({type:SET_LOADING_FALSE})