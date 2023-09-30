import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_ITEM_CATEGORY_LIST = "get_item_category_list_query_key";

const getItemCategoryList = async (restaurantId) => {
  try {
    // Make the GET request to fetch item categories for a restaurant.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.RESTAURANT.GET_RESTAURANT_DETAIL +
        `${restaurantId}` +
        `/branch/${restaurantId}/categories?language=en`
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getItemCategoryList;
