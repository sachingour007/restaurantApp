import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import menuSlice from "./menuSlice";
import tableBookingSlice from "./tableBookingSlice";
import cartSlice from "./cartSlice";
import paymentSlice from "./paymentSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    menu: menuSlice,
    tableBooking: tableBookingSlice,
    cart: cartSlice,
    payment: paymentSlice,
  },
});

export default store;
