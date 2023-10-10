import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const getNearByRestaurants = async (userCurrentAddress) => {
  try {
    // Make the GET request to fetch restaurant branch hours.
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.RESTAURANT.GET_NEARBY_RESTAURANT}?latitude=${userCurrentAddress.latitude}&longitude=${userCurrentAddress.longitude}&service_type=${userCurrentAddress.service_type}`
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getNearByRestaurants;
