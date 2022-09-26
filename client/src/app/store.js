import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
import postsReducer from '../features/posts/postsSlice';
import profilesSlice from '../features/profiles/profilesSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    profiles: profilesSlice,
  },
});
