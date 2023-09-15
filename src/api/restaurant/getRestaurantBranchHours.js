import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY =
  "get_restaurant_branch_hour_query_key";

// we will use this function with react-query
const getRestaurantBranchHours = async (restaurantId) => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.RESTAURANT.GET_RESTAURANT_DETAIL +
      `${restaurantId}` +
      "/branches" +
      "/?language=en"
  );
  return data;
};

export default getRestaurantBranchHours;
