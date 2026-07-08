import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../../api/axios'

export const fetchCart = createAsyncThunk(
  'cart/getCart',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/cart')
      return response.data.cart
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart',
      )
    }
  },
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default cartSlice.reducer
