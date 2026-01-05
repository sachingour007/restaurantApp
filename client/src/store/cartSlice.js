import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: null,
    loading: true,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload;
      state.loading = false;
    },
    resetCart: (state, action) => {
      state.cartData = null;
      state.loading = false
    }
  },
});

export const { setCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
