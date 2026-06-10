import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listFormToSign: [],
  loadingSign:true
};

export const formToSignSlice = createSlice({
  name: "formToSign",
  initialState,
  reducers: {
   
    setListFormToSign: (state, action) => {
      state.listFormToSign = action.payload;
    },
    setLoadingSign: (state, action) => {
      state.loadingSign = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setListFormToSign , setLoadingSign } = formToSignSlice.actions;

export default formToSignSlice.reducer;
