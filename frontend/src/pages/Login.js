import './Login.css'
import plantImage from '../assets/login_plant.jfif'
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
          <div className='overlay'>
          <img src={plantImage} alt='Plants' />
            <h1>🌿 Jhaad Ugao</h1>
            <p className='welcome-text'>Grow your dream garden with us</p>
            <p className='description'>
              Discover beautiful plants, manage your nursery, and bring nature
              closer to your home.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className='login-right'>
          <form className='login-form' onSubmit={handleLogin}>
            <h2>Welcome Back 👋</h2>
            <p className='subtitle'>Login to continue your gardening journey</p>

            <div className='input-group'>
              <label>Email Address</label>
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
