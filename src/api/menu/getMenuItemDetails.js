import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const GET_MENU_ITEM_DETAILS_QUERY_KEY = "get_menuItem_details_query_key";

// we will use this function with react-query
const getMenuItemDetails = async (menuItemId, restauarntId, branchId) => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.MENU.GET_MENU_ITEM_DETAILS +
      `${restauarntId}` +
      "/branch/" +
      `${branchId}` +
      "/item/" +
      `${menuItemId}` +
      "?language=en&currency_id=3"
  );
  return data;
};

export default getMenuItemDetails;
