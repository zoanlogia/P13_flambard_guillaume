// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginAPI, getProfile } from "../../tools/FetchApi.js";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await loginAPI(email, password);
    return response;
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await getProfile(token);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.status = "succeeded";
        state.user = action.payload.user;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
