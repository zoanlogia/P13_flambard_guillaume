// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, getProfile, updateUser } from "../../tools/FetchApi.js";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await login(email, password);
    if (response.error) throw new Error(response.error);
    
    // Store the token in localStorage upon successful login
    localStorage.setItem('token', response.body.token);

    return response.body; // Return whole response data instead of just the token
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const response = await getProfile(token);
      return response.body; // Return whole response data
    } catch (err) {
      // If an error occurs (like the token has expired), remove the token from localStorage
      localStorage.removeItem('token');
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (user, { rejectWithValue }) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      // I'm assuming you have an API endpoint for updating the user profile
      const response = await updateUser(user, token);
      return response.body; // Return whole response data
    } catch (err) {
      // If an error occurs (like the token has expired), remove the token from localStorage
      localStorage.removeItem('token');
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      // Remove the token from localStorage when logging out
      localStorage.removeItem('token');

      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
