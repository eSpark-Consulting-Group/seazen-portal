import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY =
  "get_restaurant_branch_hour_query_key";

const getRestaurantBranchHours = async (restaurantId) => {
  try {
    // Make the GET request to fetch restaurant branch hours.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.RESTAURANT.GET_RESTAURANT_DETAIL +
        `${restaurantId}` +
        "/branches" +
        "?language=en"
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getRestaurantBranchHours;
