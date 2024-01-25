import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const getAllArea = async (restaurant_id, branch_id) => {
  try {
    let updateEndpoint = "";
    if (restaurant_id !== null && branch_id !== null) {
      updateEndpoint = `?restaurant_id=${restaurant_id}&branch_id=${branch_id}`;
    } else {
      updateEndpoint = "";
    }

    const country_id = JSON.parse(localStorage.getItem("country"))?.id;

    // Make the GET request to fetch all areas.
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.ADDRESS.AREA}/${country_id}${updateEndpoint}`
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getAllArea;
