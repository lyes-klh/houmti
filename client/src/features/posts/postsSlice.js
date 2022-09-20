import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    feedPosts: [],
    profilePosts: [],
  },
  reducers: {
    getFeedPosts: (state, action) => {
      state.feedPosts = [...action.payload];
    },
    getProfilePosts: (state, action) => {
      state.profilePosts = [...action.payload];
    },
    addPost: (state, action) => {
      state.feedPosts = [action.payload, ...state.feedPosts];
      state.profilePosts = [action.payload, ...state.profilePosts];
    },
  },
});

export const { getFeedPosts, getProfilePosts, addPost } = postsSlice.actions;

export default postsSlice.reducer;
