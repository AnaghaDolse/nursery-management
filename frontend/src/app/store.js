import { configureStore } from '@reduxjs/toolkit'
import plantReducer from '../features/plants/plantSlice'
import categoryReducer from '../features/categories/categorySlice'

export const store = configureStore({
  reducer: {
    plants: plantReducer,
    categories: categoryReducer,
  },
})
