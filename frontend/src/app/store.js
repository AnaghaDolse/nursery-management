import { configureStore } from '@reduxjs/toolkit'
import plantReducer from '../features/plants/plantSlice'
import categoryReducer from '../features/categories/categorySlice'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    plants: plantReducer,
    categories: categoryReducer,
    auth: authReducer,
    cart: cartReducer,
  },
})
