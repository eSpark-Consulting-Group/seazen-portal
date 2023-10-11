import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_ORDERS_QUERY_KEY = "get_orders_query_key";

const getOrders = async () => {
  try {
    // Make the GET request to fetch menu item details.
    const { data } = await axiosInstance.get(API_ENDPOINTS.ORDER.GET_ORDERS);
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getOrders;
