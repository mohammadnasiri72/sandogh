import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainPageState: true,
 
};

export const resetStateSlice = createSlice({
  name: "resetState",
  initialState,
  reducers: {
    setMainPageState: (state) => {
      state.mainPageState = !state.mainPageState;
    },
   
  },
});

// Action creators are generated for each case reducer function
export const {setMainPageState } =
resetStateSlice.actions;

export default resetStateSlice.reducer;
