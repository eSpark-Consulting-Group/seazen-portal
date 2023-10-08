import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressData: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    getAddress: (state, action) => {
      state.addressData = action.payload;
    },
  },
});

export const { getAddress } = addressSlice.actions;

export default addressSlice.reducer;
