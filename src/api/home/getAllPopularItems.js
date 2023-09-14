import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const GET_ALL_POPULAR_ITEMS_QUERY_KEY =
  "get_all_popular_items_query_key";

// we will use this function with react-query
const getAllPopularItems = async () => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.HOME.GET_ALL_POPULAR_ITEMS + "?country_id=3&currency_id=3"
  );
  return data;
};

export default getAllPopularItems;
