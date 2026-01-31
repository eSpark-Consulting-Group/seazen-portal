import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reorder: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    openReorderModal: (state) => {
      state.reorder = true;
    },
    closeReorderModal: (state) => {
      state.reorder = false;
    },
  },
});

export const { openReorderModal, closeReorderModal } = orderSlice.actions;

export default orderSlice.reducer;
