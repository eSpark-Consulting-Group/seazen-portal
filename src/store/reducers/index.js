import { combineReducers } from "redux";
import auth from "./authSlice";
import theme from "./themeSlice";
import resturants from "./resturantsSlice";

const rootReducer = combineReducers({
  auth,
  theme,
  resturants,
});
export default rootReducer;
