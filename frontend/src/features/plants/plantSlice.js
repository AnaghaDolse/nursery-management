import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../api/axios'

const token = localStorage.getItem('token')

export const fetchPlants = createAsyncThunk(
  'plants/fetchPlants',
  async ({ page = 1, limit = 5, search, selectedCategories }) => {
    const params = new URLSearchParams({})

    if (page) params.append('page', page)
    if (limit) params.append('limit', limit)
    if (search) params.append('search', search)
    if (selectedCategories && selectedCategories.length > 0) {
      params.append('category', selectedCategories.join(','))
    }

    const response = await API.get(
      `http://localhost:5000/api/plants?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  },
)

export const addPlant = createAsyncThunk(
  'plants/addPlant',
  async (plantData) => {
    const response = await API.post(
      'http://localhost:5000/api/plants',
      plantData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  },
)

export const updatePlant = createAsyncThunk(
  'plants/updatePlant',
  async ({ id, updatedData }) => {
    const response = await API.put(
      `http://localhost:5000/api/plants/${id}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  },
)

export const deletePlant = createAsyncThunk(
  'plants/deletePlant',
  async (id) => {
    await API.delete(`http://localhost:5000/api/plants/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return id
  },
)

const plantSlice = createSlice({
  name: 'plants',
  initialState: {
    data: [],
    loading: false,
    error: null,
    page: 1,
    pages: 1,
    total: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.plants
        state.page = action.payload.page
        state.pages = action.payload.pages
        state.total = action.payload.total
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addPlant.fulfilled, (state, action) => {
        // state.data.push(action.payload)
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        state.data = state.data.filter((plant) => plant._id !== action.meta.arg)
      })
  },
})

export default plantSlice.reducer
