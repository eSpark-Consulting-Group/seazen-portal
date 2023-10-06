import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

// @ params: customer object
// {
//   "first_name": "string",
//   "last_name": "string",
//   "email": "string",
//   "password": "string",
//   "mobile_country_code": "string",
//   "mobile_number": "string",
// }
const updateProfile = async (customer) => {
  try {
    // Make the POST request to perform email login.
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      customer
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default updateProfile;
