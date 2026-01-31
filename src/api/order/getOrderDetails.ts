import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

export const GET_ORDER_DETAILS_QUERY_KEY = "get_order_details_query_key";

const getOrderDetails = async (order_id) => {
  try {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.ORDER.GET_ORDER_DETAILS + order_id
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getOrderDetails;
