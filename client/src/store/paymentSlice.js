import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    status: "IDLE", // IDLE | PENDING | SUCCESS | FAILED
    orderId: null,
    error: null,
    showModal: false,
  },
  reducers: {
    setPaymentPending: (state, action) => {
      state.status = "PENDING";
      state.orderId = action.payload;
      state.error = null;
      state.showModal = false;
    },

    setPaymentSuccess: (state) => {
      state.status = "SUCCESS";
      state.error = null;
      state.showModal = true;
    },

    setPaymentFailed: (state, action) => {
      state.status = "FAILED";
      state.error = action.payload || "Payment failed";
      state.showModal = true;
    },

    resetPayment: () => initialState,
  },
});

export const {
  setPaymentPending,
  setPaymentSuccess,
  setPaymentFailed,
  resetPayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;
