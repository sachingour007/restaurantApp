import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: [],
  reducers: {
    addMenu: (state, action) => {
      return action.payload;
    },
  },
});

export const { addMenu } = menuSlice.actions;
export default menuSlice.reducer;
