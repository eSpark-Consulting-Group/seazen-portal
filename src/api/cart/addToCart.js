import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const addToCartApiCall = async (cartItem) => {
  try {
    const token = localStorage.getItem("token");
    // Make the POST request with the provided token and cart item.
    const response = await axiosInstance.post(
      API_ENDPOINTS.CART.ADD_TO_CART,
      cartItem,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check the response status code.
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    // Handle network errors or other exceptions.
    handleApiError(error);
  }
};

export default addToCartApiCall;
