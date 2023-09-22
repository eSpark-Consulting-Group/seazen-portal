import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      address: "123, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
      pincode: "123456",
      city: "Lorem Ipsum",
      state: "Lorem Ipsum",
      country: "Lorem Ipsum",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    // reducers
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
