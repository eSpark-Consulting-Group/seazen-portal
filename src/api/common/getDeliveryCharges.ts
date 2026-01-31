import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const deliveryPriceApi = async () => {
  try {
    // Make the POST request to get all delivery price.
    const { data } = await axiosInstance.get(
      `/branch/${localStorage.getItem(
        "branchId"
      )}/delivery-charges?country_id=3`
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default deliveryPriceApi;
