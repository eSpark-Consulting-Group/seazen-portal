import API_ENDPOINTS from "../endpoints";

// // we will use this function with react-query
const baseURL = process.env.REACT_APP_BASE_URL;
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


