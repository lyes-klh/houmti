import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
import postsReducer from '../features/posts/postsSlice';
import profilesReducer from '../features/profiles/profilesSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    profiles: profilesReducer,
    notifications: notificationsReducer,
  },
});
