import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import menuSlice from "./menuSlice";
import tableBookingSlice from "./tableBookingSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
    tableBooking: tableBookingSlice,
  },
});

export default store;
