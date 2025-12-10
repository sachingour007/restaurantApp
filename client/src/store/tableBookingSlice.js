import { createSlice } from "@reduxjs/toolkit";

const tableBookingSlice = createSlice({
  name: "tableBooking",
  initialState: null,
  reducers: {
    addBooking: (state, action) => {
      return action.payload;
    },
  },
});

export const { addBooking } = tableBookingSlice.actions;
export default tableBookingSlice.reducer;
