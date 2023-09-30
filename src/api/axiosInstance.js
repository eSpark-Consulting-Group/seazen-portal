// Create Axios instance with interceptors
import axios from "axios";

const maxRetries = 2;
let retryCount = 0;

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = error;

    // Retry the request if it hasn't reached the maximum retry count.
    if (retryCount < maxRetries) {
      retryCount++;
      return axiosInstance(config);
    }

    // Handle the error if the maximum retry count is reached.
    return Promise.reject(error);
  }
);


export default axiosInstance;
