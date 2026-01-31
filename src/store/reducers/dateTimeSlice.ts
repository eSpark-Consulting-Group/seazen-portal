import { createSlice } from "@reduxjs/toolkit";

import dayjs from "dayjs";

const asapTime = new Date().setMinutes(new Date().getMinutes() + 30);

const initialState = {
  pickDate: dayjs(new Date()).format("MMM DD, YYYY"),
  isAsap: true,
  pickTime: dayjs(asapTime).format("hh:mm a"),
};

const dateTime = createSlice({
  name: "dateTime",
  initialState,
  reducers: {
    toggleIsAsap: (state, { payload }) => {
      state.isAsap = payload;
    },
    addPickDate: (state, { payload }) => {
      state.pickDate = payload;
    },
    addPickTime: (state, { payload }) => {
      state.pickTime = payload;
    },
  },
});

export const { toggleIsAsap, addPickDate, addPickTime } = dateTime.actions;

export default dateTime.reducer;
