import {configureStore} from '@reduxjs/toolkit';
import plantReducer from '../features/plants/plantSlice';

export const store = configureStore({
  reducer: {
    plants: plantReducer,
  },
});