import { createSlice } from "@reduxjs/toolkit";

// authSlice.js
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
      password: null,
      token: null,
      isLogged: false,
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = {
        ...action.payload,
        isLogged: true,
      };
    },
    logout: (state) => {
      state.user = {
        email: null,
        password: null,
        token: null,
        isLogged: false,
      };
    },
  },
});

export const createLogin = (email, password) => {
  return {
    type: "auth/login",
    payload: {
      email: email,
      password: password,
    },
  }
}

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
