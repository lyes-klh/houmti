import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    signup: (state) => {},
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
