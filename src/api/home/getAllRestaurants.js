import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const GET_ALL_RESTAURANTS_QUERY_KEY =
  "get_all_restaurants_query_key";

// we will use this function with react-query
const getAllRestaurants = async () => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.HOME.GET_ALL_RESTAURANT + "?country_id=3"
  );
  return data;
};

export default getAllRestaurants;
