import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_RESTAURANT_DETAILS_QUERY_KEY =
  "get_restaurant_details_query_key";

const getRestaurantDetails = async (restaurantId) => {
  try {
    // Make the GET request to fetch restaurant details.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.RESTAURANT.GET_RESTAURANT_DETAIL +
        `${restaurantId}` +
        "?country_id=3&language=en"
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getRestaurantDetails;
