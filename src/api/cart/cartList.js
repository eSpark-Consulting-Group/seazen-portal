import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

// we will use this function with react-query
const baseURL = "http://34.133.246.217/api/v1"

  const cartList = async (token) => {
    const cartListResponse = fetch(
     baseURL + API_ENDPOINTS.CART.CART_LIST,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
    );

    return  (await cartListResponse).json()
  };
export default cartList;
  

