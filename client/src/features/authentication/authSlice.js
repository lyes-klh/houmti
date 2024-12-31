import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    cities: [],
    neighborhoods: [],
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    signup: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
