import { createSlice } from '@reduxjs/toolkit';

export const profilesSlice = createSlice({
  name: 'profile',
  initialState: {
    userProfile: null,
  },
  reducers: {
    getUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { getUserProfile } = profilesSlice.actions;

export default profilesSlice.reducer;
