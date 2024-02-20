import { setBranchID } from "../../../store/reducers/resturantsSlice";

import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";

import { handleApiError } from "../../utils/errorHandling";

const getBranchByAreaId = async (
  restaurantId,
  country_id,
  area_name,
  dispatch
) => {
  try {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.RESTAURANT.GET_BRANCH_BY_AREA_ID}/${country_id}?restaurant_id=${restaurantId}&area_name=${area_name}`
    );

    // Check the response status code.
    if (response.status === 200) {
      if (!Array.isArray(response?.data?.data)) {
        localStorage.setItem("branchId", response.data.data.branch_id);
        dispatch(setBranchID(response.data.data.branch_id));
      }

      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getBranchByAreaId;
