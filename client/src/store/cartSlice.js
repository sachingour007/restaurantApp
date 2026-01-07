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
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCart, resetCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
