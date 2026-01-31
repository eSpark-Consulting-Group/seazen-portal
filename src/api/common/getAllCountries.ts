import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const countryList = async () => {
  try {
    // Make the POST request to get all countries.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.COMMON.GET_ALL_COUNTRIES,
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default countryList;
