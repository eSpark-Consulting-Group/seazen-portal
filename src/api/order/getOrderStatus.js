import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const getOrderStatus = async (orderData) => {
  try {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.ORDER.GET_ORDER_STATUS,
      {
        ...orderData,
      }
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getOrderStatus;
