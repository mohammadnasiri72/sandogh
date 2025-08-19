import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  capitalAmount: "",
  dateFaRegister: new Date(),
  errRegisterDateFa: false,
  registerDateFa: new Date().toLocaleDateString("fa-IR"),
};

export const capitalSlice = createSlice({
  name: "capital",
  initialState,
  reducers: {
    setCapitalAmount: (state, action) => {
      state.capitalAmount = action.payload;
    },
    setDateFaRegister: (state, action) => {
      state.dateFaRegister = action.payload;
    },
    setErrRegisterDateFa: (state, action) => {
      state.errRegisterDateFa = action.payload;
    },
    setRegisterDateFa: (state, action) => {
      state.registerDateFa = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCapitalAmount,
  setDateFaRegister,
  setErrRegisterDateFa,
  setRegisterDateFa,
} = capitalSlice.actions;

export default capitalSlice.reducer;
