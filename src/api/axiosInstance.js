// Create Axios instance with interceptors
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Create a cancel token source.
const cancelTokenSource = axios.CancelToken.source();

// Request interceptor to limit the number of retries
axiosInstance.interceptors.request.use((config) => {
  config.retry = 2; // Set the maximum number of retries (including the initial request)
  config.retryDelay = 1000; // Set the delay between retries in milliseconds
  config.cancelToken = cancelTokenSource.token; // Associate the request with the cancel token
  return config;
});

// Response interceptor to handle mixed content errors and retries
axiosInstance.interceptors.response.use(
  (response) => {
    // Successful response, return it as-is
    return response;
  },
  (error) => {
    const { config, response } = error;

    // Check if the error is due to mixed content
    if (response && response.status === 0 && config.retry) {
      // Reduce the number of retries
      config.retry--;

      // Cancel any pending retries to prevent multiple retries
      cancelTokenSource.cancel("Request canceled due to mixed content error");

      // Create a new promise to retry the request after a delay
      const retryPromise = new Promise((resolve) => {
        setTimeout(() => resolve(axiosInstance(config)), config.retryDelay);
      });

      return retryPromise;
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
