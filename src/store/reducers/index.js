import { combineReducers } from "redux";
import auth from "./authSlice";
import cart from "./cartSlice";
import theme from "./themeSlice";
import resturants from "./resturantsSlice";

const rootReducer = combineReducers({
  auth,
  cart,
  theme,
  resturants,
});
export default rootReducer;
