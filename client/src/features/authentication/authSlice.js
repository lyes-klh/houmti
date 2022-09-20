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

// Action creators are generated for each case reducer function
export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
