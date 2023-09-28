import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

export const GET_ITEM_CATEGORY_LIST = "get_item_category_list_query_key";

// we will use this function with react-query
const getItemCategoryList = async (restaurantId) => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.RESTAURANT.GET_RESTAURANT_DETAIL +
      `${restaurantId}` +
      `/branch/${restaurantId}/categories?language=en`
  );
  return data;
};

export default getItemCategoryList;
