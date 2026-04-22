import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPlants = createAsyncThunk('plants/fetchPlants', async () => {
  const response = await axios.get('http://localhost:5000/api/plants')
  return response.data
})

export const addPlant = createAsyncThunk(
  'plants/addPlant',
  async (plantData) => {
    const response = await axios.post(
      'http://localhost:5000/api/plants',
      plantData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return response.data
  },
)

export const updatePlant = createAsyncThunk(
  'plants/updatePlant',
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/plants/${id}`,
      updatedData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    )
    return response.data
  },
)  

export const deletePlant = createAsyncThunk(
  'plants/deletePlant',
  async (id) => {
    await axios.delete(`http://localhost:5000/api/plants/${id}`)
    return id
  },
)

const plantSlice = createSlice({
  name: 'plants',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addPlant.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        state.data = state.data.filter((plant) => plant._id !== action.payload)
      })
  },
})

export default plantSlice.reducer
