
export const handleApiError = (error) => {
    if (error.response) {
      // Handle errors with a response from the server (e.g., non-2xx status codes).
      console.error("Request failed with response:", error.response.data);
      throw error.response.data.message;
    } else if (error.message) {
      // Handle other errors (e.g., network issues, invalid token).
      console.error("Request failed with error:", error.message);
      throw new Error("Request failed with error.");
    } else {
      // Handle unexpected errors.
      console.error("Request failed with an unexpected error:", error);
      throw new Error("Request failed with an unexpected error.");
    }
  };

  