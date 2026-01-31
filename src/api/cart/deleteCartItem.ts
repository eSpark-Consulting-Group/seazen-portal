import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const deleteCart = async (deleteItemData, token) => {
  try {
    // Check if the token is valid and available.
    if (!token) {
      throw new Error("Token is missing or invalid.");
    } 

    // Make the DELETE request with the provided token and cart ID.
    const response = await axiosInstance.post(API_ENDPOINTS.CART.DELETE_CART, 
      deleteItemData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    // Check the response status code.
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default deleteCart;