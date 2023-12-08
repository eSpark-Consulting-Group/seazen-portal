import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const getAllArea = async (token) => {
  try {
    if (token === null) {
      const err = "Token is missing or invalid";
      handleApiError(err);
      // throw new Error("Token is missing or invalid.");
    }

    const country_id = JSON.parse(localStorage.getItem("country")).id;

    // Make the GET request to fetch all addresses.
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.ADDRESS.AREA}/${country_id}`
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getAllArea;
