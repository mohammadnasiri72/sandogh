import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loanId: 0,
  loanRequestData: {},
  valCooperative: {
    title: "همه تشکل ها",
    userName: 0,
  },
  valSort: 1,
  query: "",
  valRecord: 1,
  valTabs: 0,
};

export const adminLoanRequestSlice = createSlice({
  name: "adminLoanRequest",
  initialState,
  reducers: {
    setLoanId: (state, action) => {
      state.loanId = action.payload;
    },
    setLoanRequestData: (state, action) => {
      state.loanRequestData = action.payload;
    },
    setValCooperative: (state, action) => {
      state.valCooperative = action.payload;
    },
    setValSort: (state, action) => {
      state.valSort = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setValRecord: (state, action) => {
      state.valRecord = action.payload;
    },
    setValTabs: (state, action) => {
      state.valTabs = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoanId,
  setLoanRequestData,
  setValCooperative,
  setValSort,
  setQuery,
  setValRecord,
  setValTabs,
} = adminLoanRequestSlice.actions;

export default adminLoanRequestSlice.reducer;
