import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_ALL_POPULAR_ITEMS_QUERY_KEY =
  "get_all_popular_items_query_key";

const getAllPopularItems = async () => {
  try {
    // Make the GET request to fetch popular items.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.HOME.GET_ALL_POPULAR_ITEMS + "?country_id=3&currency_id=3"
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getAllPopularItems;
