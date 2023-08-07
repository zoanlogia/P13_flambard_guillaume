import { createSlice } from "@reduxjs/toolkit";

// authSlice.js
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
      password: null,
      token: localStorage.getItem("token"),

      firstName: null,
      lastName: null,
      isLogged: false,
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
        isLogged: true,
      };
    },
    updateUserProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
        isLogged: true,
      };
    },
    logout: (state) => {
      state.user = {
        email: null,
        password: null,
        token: null,
        firstName: null,
        lastName: null,
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
  };
};

export const updateUserProfile = (profile) => {
  return {
    type: "auth/updateUserProfile",
    payload: profile,
  };
};

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
