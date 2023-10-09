import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const addAddressApiCall = async (body, token) => {
  try {
    // Check if the token is valid and available.
    if (!token) {
      throw new Error("Token is missing or invalid.");
    }

    const response = await axiosInstance.post(
      API_ENDPOINTS.ADDRESS.ADDRESS,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // // Check the response status code.
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

export default addAddressApiCall;
