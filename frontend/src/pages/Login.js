import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        },
      )
      dispatch(loginSuccess(response.data))
      toast.success('Login successful')
      navigate('/add-plant')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        {/* Left Side */}

        <div className='login-left'>
          <h1>🌿 Jhaad Ugao</h1>

          <p>Welcome back!</p>

          <p className='tagline'>Grow your dream garden with us.</p>

          <img
            src='https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=700'
            alt='Plants'
          />
        </div>

        {/* Right Side */}

        <div className='login-right'>
          <form className='login-form' onSubmit={handleLogin}>
            <h2>Welcome Back 👋</h2>

            <p className='subtitle'>Login to continue</p>

            <div className='input-group'>
              <label>Email</label>

              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='input-group'>
              <label>Password</label>

              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className='login-btn' type='submit' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className='register-link'>
              Don't have an account?{' '}
              <span onClick={() => navigate('/register')}>Register</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
