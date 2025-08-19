import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loanId: 0,
  valTab: 0,
  valCooperative: {
    title: "همه تشکل ها",
    provinceId: 0,
  },
  query: "",
  valSort: 5,
  valOrder: 0,
  valRecord: 1,
};

export const adminLoanSlice = createSlice({
  name: "adminLoan",
  initialState,
  reducers: {
    setLoanId: (state, action) => {
      state.loanId = action.payload;
    },
    setValTab: (state, action) => {
      state.valTab = action.payload;
    },
    setValCooperative: (state, action) => {
      state.valCooperative = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setValSort: (state, action) => {
      state.valSort = action.payload;
    },
    setValOrder: (state, action) => {
      state.valOrder = action.payload;
    },
    setValRecord: (state, action) => {
      state.valRecord = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoanId,
  setValTab,
  setValCooperative,
  setQuery,
  setValSort,
  setValOrder,
  setValRecord,
} = adminLoanSlice.actions;

export default adminLoanSlice.reducer;
