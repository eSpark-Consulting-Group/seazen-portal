import { combineReducers } from "redux";
import auth from "./authSlice";
import theme from "./themeSlice";

const rootReducer = combineReducers({
  auth,
  theme,
});
export default rootReducer;
