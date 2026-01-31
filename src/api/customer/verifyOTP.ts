import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const verifyOTP = async ({ mobile_country_code, mobile_number, otp }) => {
  try {
    // Make the POST request to perform mobile login.
    const { data } = await axiosInstance.post(API_ENDPOINTS.USER.VERIFY_OTP, {
      mobile_country_code,
      mobile_number,
      otp,
    });
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default verifyOTP;
