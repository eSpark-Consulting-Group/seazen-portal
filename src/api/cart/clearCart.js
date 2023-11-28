import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const clearCart = async () => {
  try {
    // Make the POST request to perform clear existing cart.
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CART.CLEAR_CART,
      {}
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default clearCart;
