import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loanId: 0,
  loanRequestData: {},
  query: "",
  valSort: 1,
  pageSize: 25,
  valuetabs: 1,
};

export const loanRequestSlice = createSlice({
  name: "loanRequest",
  initialState,
  reducers: {
    setLoanId: (state, action) => {
      state.loanId = action.payload;
    },
    setLoanRequestData: (state, action) => {
      state.loanRequestData = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setValSort: (state, action) => {
      state.valSort = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setValuetabs: (state, action) => {
      state.valuetabs = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoanId,
  setLoanRequestData,
  setQuery,
  setValSort,
  setPageSize,
  setValuetabs,
} = loanRequestSlice.actions;

export default loanRequestSlice.reducer;
