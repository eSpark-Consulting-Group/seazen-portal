import { combineReducers } from "redux";
import auth from "./authSlice";

const rootReducer = combineReducers({
  auth,
});
export default rootReducer;
