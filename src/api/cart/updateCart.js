import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

// we will use this function with react-query
const updateCart = async (cartItem, token) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.CART.UPDATE_CART,
      cartItem,
      {
        headers: {
            Authorization: 'Bearer ' + token
        }
      }
    );
    return data;
  };
  
export default updateCart;
  

