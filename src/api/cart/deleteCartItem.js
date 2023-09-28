import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

// we will use this function with react-query
const deleteCart = async (cartID, token) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CART.DELETE_CART,
      cartID,
      {
        headers: {
            Authorization: 'Bearer ' + token
        }
      }
    );
    return data;
  };
  
export default deleteCart;
  

