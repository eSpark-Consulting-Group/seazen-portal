import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const mobileLogin = async (mobile_country_code, mobile_number, password) => {
  try {
    // Make the POST request to perform mobile login.
    const { data } = await axiosInstance.post(API_ENDPOINTS.USER.MOBILE_LOGIN, {
      mobile_country_code,
      mobile_number,
      password,
    });
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default mobileLogin;
