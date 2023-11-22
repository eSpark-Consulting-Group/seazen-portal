import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_CATEGORY_LIST_ITEM = "get_category_list_item_query_key";

const getListItemByCategory = async (restaurantId, category, country_id) => {
  try {
    // Make the GET request to fetch items by category for a restaurant.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.RESTAURANT.GET_RESTAURANT_DETAIL +
        `${restaurantId}` +
        `/branch/${localStorage.getItem(
          "branchId"
        )}/items?country_id=${country_id}&language=en${
          category ? `&category_id=${category}` : ""
        }`
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getListItemByCategory;
