import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const addOrderRating = async ({ order_id, rating }) => {
  try {
    // Make the POST request to perform email login.
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.ORDER.ORDER_RATING,
      {
        order_id,
        rating,
      }
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default addOrderRating;
