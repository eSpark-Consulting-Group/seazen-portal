import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const getAllArea = async (restaurantId, branchId) => {
  try {
    let attachEndpoint = "";
    // const restaurant_id = localStorage.getItem("restaurantID");
    // const branch_id = localStorage.getItem("branchId");

    // if (restaurantId !== null && branchId !== null) {
    //   attachEndpoint = updateEndpoint(restaurantId, branchId);
    // } else if (restaurant_id !== null && branch_id !== null) {
    //   attachEndpoint = updateEndpoint(restaurant_id, branch_id);
    // } else {
    //   attachEndpoint = "";
    // }
    if (restaurantId !== null && branchId !== null) {
      attachEndpoint = updateEndpoint(restaurantId, branchId);
    } else {
      attachEndpoint = "";
    }

    const country_id = JSON.parse(localStorage.getItem("country"))?.id;

    // Make the GET request to fetch all areas.
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.ADDRESS.AREA}/${country_id}${attachEndpoint}`
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

const updateEndpoint = (restID, branID) => {
  let updateEndpoint = "";
  if (restID && branID) {
    updateEndpoint = `?restaurant_id=${restID}&branch_id=${branID}`;
  } else {
    updateEndpoint = "";
  }

  return updateEndpoint;
};

export default getAllArea;
