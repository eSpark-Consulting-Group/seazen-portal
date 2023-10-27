import { combineReducers } from "redux";
import auth from "./authSlice";
import cart from "./cartSlice";
import theme from "./themeSlice";
import resturants from "./resturantsSlice";
import address from "./addressSlice";
import dateTime from "./dateTimeSlice";

const rootReducer = combineReducers({
  auth,
  cart,
  theme,
  resturants,
  address,
  dateTime,
});
export default rootReducer;
