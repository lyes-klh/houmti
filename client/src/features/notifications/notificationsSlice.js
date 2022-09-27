import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
  },
  reducers: {
    getNotifications: (state, action) => {
      state.notifications = [...action.payload];
    },
  },
});

export const { getNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
