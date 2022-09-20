import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
import postsReducer from '../features/posts/postsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
