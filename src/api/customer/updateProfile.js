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
    const { token, data } = customer;
    // Check if the token is valid and available.
    if (!token) {
      throw new Error("Token is missing or invalid.");
    }

    // Make the POST request with the provided token and an empty body.
    const response = await axiosInstance.post(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      data,
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
    // Handle network errors or other exceptions.
    handleApiError(error);
  }
};

export default updateProfile;
