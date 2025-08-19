import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valStatusCooperative: 0,
  valPriorityCooperative: 0,
  valRecordCooperative: 1,
  numPages : 1,
  find:'',
  isLoading: true,
  showFieldTable: [],
  valProvince: { title: "همه استان ها", id: 0 },
  listProvince: [],
  listCooperative:[],
  selectCooperative: {},
  cooperativeId:0
};

export const cooperativeSlice = createSlice({
  name: "cooperative",
  initialState,
  reducers: {
    setListProvince: (state, action) => {
      state.listProvince = action.payload;
    },
    setValStatusCooperative: (state, action) => {
      state.valStatusCooperative = action.payload;
    },
    setValPriorityCooperative: (state, action) => {
      state.valPriorityCooperative = action.payload;
    },
    setValRecordCooperative: (state, action) => {
      state.valRecordCooperative = action.payload;
    },
    setValProvince: (state, action) => {
      state.valProvince = action.payload;
    },
    setshowFieldTable: (state, action) => {
      state.showFieldTable = action.payload;
    },
    setFind: (state, action) => {
      state.find = action.payload;
    },
    setNumPages: (state, action) => {
      state.numPages = action.payload;
    },
    setIsLoading: (state , action) => {
      state.isLoading = action.payload;
    },
    setSelectCooperative: (state , action) => {
      state.selectCooperative = action.payload;
    },
   
    setCooperativeId: (state , action) => {
      state.cooperativeId = action.payload;
    },
    
    setListCooperative: (state, action) => {
      state.listCooperative = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setListProvince,
  setValStatusCooperative,
  setValProvince,
  setValPriorityCooperative,
  setValRecordCooperative,
  setshowFieldTable,
  setFind,
  setNumPages,
  setListCooperative,
  setIsLoading,
  setSelectCooperative,
  setCooperativeId
} = cooperativeSlice.actions;

export default cooperativeSlice.reducer;
