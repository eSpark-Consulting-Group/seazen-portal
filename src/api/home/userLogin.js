import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const emailLogin = async (cartItems) => {
  try {
    // Make the POST request to perform email login.
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USER.EMAIL_LOGIN,
      cartItems
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default emailLogin;
