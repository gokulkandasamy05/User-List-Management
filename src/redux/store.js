import { applyMiddleware, combineReducers, createStore } from "redux";
import userReducer from "./reducers/userReducer";
import loaderReducer from "./reducers/loaderReducers";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
  User: userReducer,
  Loader: loaderReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
