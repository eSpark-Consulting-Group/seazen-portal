import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      mobile_country_code: "+962",
      mobile: "1234567890",
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
    addToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    addUserInfo: (state, action) => {
      const {values, mobileCountryCode, mobile} = action.payload
      const {first_name, last_name, email } = values
      // console.log(values, "shah");
      // console.log(mobileCountryCode, "shah");
      // console.log(mobile, "shah");
      state.name = first_name + last_name;
      state.email = email;
      state.mobile_country_code = mobileCountryCode;
      state.mobile = mobile
    } 
  },
});

export const { addToken, addUserInfo } = authSlice.actions;

export default authSlice.reducer;
