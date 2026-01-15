import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: true,
  },
  reducers: {
    addOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addOrders, setLoading } = orderSlice.actions;
export default orderSlice.reducer;
