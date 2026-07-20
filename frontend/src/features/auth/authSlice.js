import { createSlice } from '@reduxjs/toolkit'

const storedUser =
  JSON.parse(localStorage.getItem('user')) ||
  JSON.parse(sessionStorage.getItem('user'))

const storedToken =
  localStorage.getItem('token') || sessionStorage.getItem('token')

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.user = null
      state.token = null

      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
