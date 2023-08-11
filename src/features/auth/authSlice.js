import { createSlice } from "@reduxjs/toolkit";

// authSlice.js
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isLogged: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.body.token;
      state.isAuth = true;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.token = null;
      state.isAuth = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.isAuth = false;
      state.error = null;
    },
    isToken: (state) => {
      state.isAuth = true;
    },
    logoClick: (state) => {
      state.logoClick = true;
    },
  },
});

export const { loginSuccess, loginFail, logoutSuccess, isToken, logoClick } = authSlice.actions;

export default authSlice.reducer;
