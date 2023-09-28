import axiosInstance from "../axiosInstance";
import API_ENDPOINTS from "../endpoints";

// // we will use this function with react-query
const baseURL = "http://34.133.246.217/api/v1";
const checkout = async (data, token) => {
  const response = fetch(baseURL + API_ENDPOINTS.CART.CHECKOUT, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    method: "POST",
    body: JSON.stringify(data)
  });
  return (await response).json();
};

export default checkout;


