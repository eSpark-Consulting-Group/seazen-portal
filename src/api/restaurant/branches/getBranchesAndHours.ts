import axiosInstance from "../../axiosInstance";
import API_ENDPOINTS from "../../endpoints";
import { handleApiError } from "../../utils/errorHandling";

export const GET_BRANCHES_AND_HOURS_QUERY_KEY =
  "GET_BRANCHES_AND_HOURS_QUERY_KEY";

const getBranchesAndHours = async (restaurantId) => {
  try {
    // Make the GET request to fetch item categories for a restaurant.
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.RESTAURANT.GET_BRANCHES_AND_HOURS(restaurantId)
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default getBranchesAndHours;
