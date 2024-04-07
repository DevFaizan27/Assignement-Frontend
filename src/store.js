import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/slices/userSlice';
import teamSlice from './redux/slices/teamSlice';

const store = configureStore({
  reducer: {
    user:userSlice,
    team:teamSlice
  },
});

export default store;