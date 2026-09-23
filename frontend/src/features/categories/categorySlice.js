import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import API from '../../api/axios'

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await API.get('/categories')
    return response.data
  },
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
  },
})

export default categorySlice.reducer
