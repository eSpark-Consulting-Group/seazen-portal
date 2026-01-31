import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";
import { handleApiError } from "../utils/errorHandling";

const applyPromoCode = async (promoCode ,token) => {

  try {
    // Make the POST request to check promoCode valid or not.
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CART.APPLY_PROMO_CODE, promoCode,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    // Use the handleApiError function for error handling
    handleApiError(error);
  }
};

export default applyPromoCode;
