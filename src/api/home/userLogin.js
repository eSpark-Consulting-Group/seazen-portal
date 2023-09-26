import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

// we will use this function with react-query
const emailLogin = async (cartItems) => {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.USER.EMAIL_LOGIN,
      cartItems
    );
    return data;
  };
  
export default emailLogin;
  

