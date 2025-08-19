import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isColaps: false,
};

export const colapsSlice = createSlice({
  name: "colaps",
  initialState,
  reducers: {
    toggleColapsDashboard: (state) => {
      state.isColaps = !state.isColaps;
    },
    changeColapsDashboard: (state, action) => {
      state.isColaps = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleColapsDashboard , changeColapsDashboard} = colapsSlice.actions;

export default colapsSlice.reducer;
