import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './reducer.js';

const store = configureStore({
  reducer: {
    team: teamReducer,
  },
});

export default store;
