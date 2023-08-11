import { createSlice } from "@reduxjs/toolkit";

// userSlice.js
const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    error: null,
  },
  reducers: {
    userSuccess: (state, action) => {
      state.email = action.payload.body.email;
      state.firstName = action.payload.body.firstName;
      state.lastName = action.payload.body.lastName;
      state.id = action.payload.body.id;
      state.error = null;
    },
    userFail: (state, action) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.id = null;
      state.error = action.payload.message;
    },
    userLogout: (state) => {
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.id = null;
      state.error = null;
    },
    userUpdateSuccess: (state, action) => {
      state.email = action.payload.body.email;
      state.firstName = action.payload.body.firstName;
      state.lastName = action.payload.body.lastName;
      state.id = action.payload.body.id;
      state.error = null;
    },
    userUpdateFail: (state, action) => {
      state.email = action.payload.body.email;
      state.firstName = action.payload.body.firstName;
      state.lastName = action.payload.body.lastName;
      state.id = action.payload.body.id;
      state.error = action.payload.message;
    },
  },
});

export const {
  userSuccess,
  userFail,
  userLogout,
  userUpdateSuccess,
  userUpdateFail,
} = userSlice.actions;

export default userSlice.reducer;
