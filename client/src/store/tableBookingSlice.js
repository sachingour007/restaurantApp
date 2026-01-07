import { createSlice } from "@reduxjs/toolkit";

const tableBookingSlice = createSlice({
  name: "tableBooking",
  initialState: {
    bookingData: [],
    loading: true,
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookingData = action.payload;
      state.loading = false;
    },
    clearBookings: (state) => {
      state.bookingData = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addBooking, setLoading, clearBookings } =
  tableBookingSlice.actions;
export default tableBookingSlice.reducer;
