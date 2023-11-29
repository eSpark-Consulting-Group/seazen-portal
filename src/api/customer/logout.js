import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const logout = async (token) => {
  try {
    // Make the POST request to perform logout.
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USER.LOGOUT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default logout;
