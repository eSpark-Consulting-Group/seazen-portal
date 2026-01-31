import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const updateAddressApiCall = async (body, addressId, token) => {
  try {
    // Check if the token is valid and available.
    if (!token) {
      throw new Error("Token is missing or invalid.");
    }

    // Make the PUT request with the provided id and address data.
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.ADDRESS.ADDRESS}/${addressId}`,
      body,
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
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default updateAddressApiCall;
