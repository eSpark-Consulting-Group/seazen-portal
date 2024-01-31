import { combineReducers } from "redux";
import auth from "./authSlice";
import cart from "./cartSlice";
import theme from "./themeSlice";
import resturants from "./resturantsSlice";
import address from "./addressSlice";
import dateTime from "./dateTimeSlice";
import order from "./orderSlice";
import location from "./userLocationSlice";
import toLoad from "./loaderSlice";

const rootReducer = combineReducers({
  auth,
  cart,
  theme,
  resturants,
  address,
  dateTime,
  order,
  location,
  toLoad,
});
export default rootReducer;
