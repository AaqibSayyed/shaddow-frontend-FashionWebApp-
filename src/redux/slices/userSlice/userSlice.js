import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, updateUserState,userLogout, userPasswordForget, userPasswordReset } from "./userThunk";

const initialState = {
  isLoading: false,
  user: {},
  isAuthenticated: false,
  isErrorLogin: false,
  isErrorRegister: false,
  isErrorLogout: false,
  isErrorForgotPassword: false,
  passwordForgotMessage:'',

  
  isErrorResetPassword: false,
  passwordResetMessage:'',

  errorMessage: "",
  userLoagOut: false, 
  userLogOutMessage: '',
  userCurrentLocation: ''
};

const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    clearError(state){
      state.isErrorLogin = false;
      state.isErrorRegister = false;
      state.isErrorLogout = false;
      state.isErrorForgotPassword = false;
      state.isErrorResetPassword = false;
      state.errorMessage = '';
      state.passwordForgotMessage = '';
      state.passwordResetMessage = '';
  },
  updateUserLocation(state, action){
    if(action.payload !== "/login" && action.payload !== '/register' && action.payload !== '/forgetpassword' && action.payload !== '/forgetpassword/reset')
    {
      state.userCurrentLocation = action.payload
    }
  }
}, 
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.isLoading = true;
        state.user = {};
        state.isAuthenticated = false;
        state.isErrorLogin = false;
        state.errorMessage = "";
      })
      .addCase(userLogin.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isErrorLogin = false;
        state.errorMessage = "";
      }).addCase(userLogin.rejected, (state, action)=>{
        state.isLoading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.isErrorLogin = true;
        state.errorMessage = action.payload.message? action.payload.message: action.payload;
    }).addCase(userRegister.pending, (state, action) => {
        state.isLoading = true;
        state.user = {};
        state.isAuthenticated = false;
        state.isErrorRegister = false;
        state.errorMessage = "";
      }).addCase(userRegister.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isErrorRegister = false;
        state.errorMessage = "";
      }).addCase(userRegister.rejected, (state, action)=>{
        state.isLoading = false;
        state.user = {};
        state.isAuthenticated = false;
        state.isErrorRegister = true;
        state.errorMessage = action.payload.message? action.payload.message: action.payload;
    }).addCase(updateUserState.pending, (state, action)=>{
      state.user = {};
      state.isAuthenticated = false;
      state.errorMessage = "";
    })
    .addCase(updateUserState.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.errorMessage = "";
    }).addCase(updateUserState.rejected, (state, action)=>{
      state.isLoading = false;
      state.user = {};
      state.isAuthenticated = false;
    })
    .addCase(userLogout.pending, (state, action) => {
      state.isLoading = true;
      state.isErrorLogout = false;
      state.errorMessage = "";
      state.userLoagOut = false;
      state.userLogOutMessage = '';
    }).addCase(userLogout.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.isErrorLogout = false;
      state.errorMessage = "";
      state.userLoagOut = true;
      state.userLogOutMessage = 'Logged Out Successfully';
    }).addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrorLogout = true;
      state.errorMessage = action.payload.message? action.payload.message: action.payload;
      state.userLoagOut = false;
      state.userLogOutMessage = '';
    }).addCase(userPasswordForget.pending, (state, action) => {
      state.isLoading = true;
      state.isErrorForgotPassword = false;
      state.passwordForgotMessage = '';
      state.errorMessage = '';
    }).addCase(userPasswordForget.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isErrorForgotPassword = false;
      state.passwordForgotMessage = action.payload;
      state.errorMessage = '';
    }).addCase(userPasswordForget.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrorForgotPassword = true;
      state.passwordForgotMessage = '';
      state.errorMessage = action.payload.message? action.payload.message: action.payload;
    }).addCase(userPasswordReset.pending, (state, action) => {
      state.isLoading = true;
      state.isErrorResetPassword = false;
      state.passwordResetMessage = '';
      state.errorMessage = '';
    }).addCase(userPasswordReset.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isErrorResetPassword = false;
      state.passwordResetMessage = action.payload;
      state.errorMessage = '';
    }).addCase(userPasswordReset.rejected, (state, action) => {
      state.isLoading = false;
      state.isErrorResetPassword = true;
      state.passwordResetMessage = '';
      state.errorMessage = action.payload.message? action.payload.message: action.payload;
    })
  },
});



export const { clearError, updateUserLocation } = userAuth.actions
export default userAuth.reducer;
