import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  username: "",
  password: "",
  remember: false,
  error: "",
  account: {},
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changUserNameHandler: (state, action) => {
      state.username = action.payload;
    },
    changPasswordHandler: (state, action) => {
      state.password = action.payload;
    },
    changRememberHandler: (state) => {
      state.remember = !state.remember;
    },
   
    setErrorHandler: (state , action) => {
      state.error = action.payload;
    },
   
  },
 
});

// Action creators are generated for each case reducer function
export const { changUserNameHandler, changPasswordHandler , changRememberHandler  , setErrorHandler} =
  LoginSlice.actions;

export default LoginSlice.reducer;
