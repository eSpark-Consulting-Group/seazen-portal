import { combineReducers } from "redux";
import auth from "./authSlice";
import cart from "./cartSlice";
import theme from "./themeSlice";
import resturants from "./resturantsSlice";
import addressSlice from "./addressSlice";

const rootReducer = combineReducers({
  auth,
  cart,
  theme,
  resturants,
  address: addressSlice,
});
export default rootReducer;
