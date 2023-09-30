import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_ALL_RESTAURANTS_QUERY_KEY =
  "get_all_restaurants_query_key";

const getAllRestaurants = async () => {
  try {
    // Make the GET request to fetch all restaurants.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.HOME.GET_ALL_RESTAURANT + "?country_id=3"
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getAllRestaurants;
