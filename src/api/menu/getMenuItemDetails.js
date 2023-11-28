import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_MENU_ITEM_DETAILS_QUERY_KEY = "get_menuItem_details_query_key";

const getMenuItemDetails = async (menuItemId, restauarntId, branchId) => {
  try {
    // Make the GET request to fetch menu item details.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.MENU.GET_MENU_ITEM_DETAILS +
        `${restauarntId}` +
        "/branch/" +
        `${localStorage.getItem("branchId")}` +
        "/item/" +
        `${menuItemId}` +
        "?language=en&currency_id=3"
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getMenuItemDetails;
