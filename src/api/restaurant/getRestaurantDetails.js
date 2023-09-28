import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const GET_RESTAURANT_DETAILS_QUERY_KEY =
  "get_restaurant_details_query_key";

// we will use this function with react-query
const getRestaurantDetails = async (restaurantId) => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.RESTAURANT.GET_RESTAURANT_DETAIL +
      `${restaurantId}` +
      "?country_id=3&language=en"
  );
  return data;
};

export default getRestaurantDetails;
