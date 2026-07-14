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

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (plantId, thunkAPI) => {
    try {
      const response = await API.post('/cart', { plantId: plantId })
      return response.data.cart
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add item to cart',
      )
    }
  },
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id, thunkAPI) => {
    try {
      const response = await API.delete(`/cart/${id}`)
      return response.data.cart
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'failed to remove item from cart',
      )
    }
  },
)

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ plantId, action }, thunkAPI) => {
    try {
      const response = await API.patch(`/cart/updateQuantity/${plantId}`, { action })
      return response.data.cart
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update item quantity',
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
      .addCase(addToCart.pending, (state) => {
        state.loading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default cartSlice.reducer
