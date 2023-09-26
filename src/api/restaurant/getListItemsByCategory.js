import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const GET_CATEGORY_LIST_ITEM = "get_category_list_item_query_key";

// we will use this function with react-query
const getListItemByCategory = async (restaurantId) => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.RESTAURANT.GET_RESTAURANT_DETAIL +
      `${restaurantId}` +
      `/branch/${restaurantId}/items?country_id=3&language=en`
  );
  return data;
};

export default getListItemByCategory;
