import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const getAllAddress = async (token) => {
  try {
    if (!token) {
      const err = "Token is missing or invalid";
      handleApiError(err);
      // throw new Error("Token is missing or invalid.");
    }

    // Make the GET request to fetch all restaurants.
    const { data } = await axiosInstance.get(API_ENDPOINTS.ADDRESS.ADDRESS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getAllAddress;
