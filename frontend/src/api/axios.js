import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const SERVER_URL = process.env.REACT_APP_API_URL.replace('/api', '')

//Request Interceptor (attach token)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default API
