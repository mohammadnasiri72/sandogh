import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../redux/slice/auth/loginSlice'
import colapsReducer from '../redux/slice/isColaps'
import settingReducer from '../redux/slice/setting'
import cooperativeReducer from '../redux/slice/cooperative'
import loanRequestReducer from '../redux/slice/loanRequest'
import adminLoanRequestReducer from '../redux/slice/adminLoanRequest'
import adminLoanReducer from '../redux/slice/adminLoan'
import resetStateSliceReducer from '../redux/slice/resetState'
import capitalSliceReducer from '../redux/slice/capital'
import formToSignSliceReducer from '../redux/slice/formToSign'

export const store = configureStore({
  reducer: {
    login : loginReducer,
    colaps : colapsReducer,
    setting : settingReducer,
    cooperative : cooperativeReducer,
    loanRequest : loanRequestReducer,
    adminLoanRequest : adminLoanRequestReducer,
    adminLoan : adminLoanReducer,
    resetState : resetStateSliceReducer,
    capital : capitalSliceReducer,
    formToSign : formToSignSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})