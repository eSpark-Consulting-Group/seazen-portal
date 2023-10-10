import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      name: "",
      email: "",
      mobile_country_code: "",
      mobile: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
      image: "https://www.w3schools.com/howto/img_avatar.png",
    },
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    country: {}
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    addUserInfo: (state, action) => {
      const { customer_id, first_name, last_name, email, mobile_country_code, mobile_no } = action.payload
      state.user.id = customer_id;
      state.user.name = first_name + " " + last_name;
      state.user.email = email;
      state.user.mobile_country_code = mobile_country_code;
      state.user.mobile = mobile_no
    },
    addCountry: (state, action) => {
      state.country = action.payload
    }, 
  },
});

export const { addToken, addUserInfo, addCountry } = authSlice.actions;

export default authSlice.reducer;
