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

  },
});

export const {setCart} = cartSlice.actions
export default cartSlice.reducer
