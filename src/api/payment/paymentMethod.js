import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

// we will use this function with react-query
const payment = async (token) => {
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.PAYMENT_METHOD.PAYMENT,
      {
        headers: {
            Authorization: 'Bearer ' + token
        }
      }
    );
    return data;
  };
  
export default payment;
  

