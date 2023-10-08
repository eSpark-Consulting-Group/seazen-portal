import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_ALL_RESTAURANTS_QUERY_KEY =
  "get_all_restaurants_query_key";

const getAllRestaurantsBanner = async (country_id) => {
  try {
    // Make the GET request to fetch all restaurants banner.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.HOME.GET_ALL_RESTAURANTS_BANNER + "?country_id=" + country_id
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getAllRestaurantsBanner;
